// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import styles from "./FinanceEventStatsPage.module.css";
import { getData } from "../utils/getData";
import { useNotifications } from "../components/NotificationProvider";
import { formatDate } from "../utils/formatUtils";
import { useAuth } from "../context/AuthContext";
import { useLocation } from "react-router-dom";
import { jsPDF } from "jspdf";

const FinanceEventStatsPage = () => {
  const { addNotification } = useNotifications();
  const { token } = useAuth();
  const event = useLocation().state.event;

  const [reportData, setReportData] = useState(null);
  const [eventPlanners, setEventPlanners] = useState([]);
  const [budgetLogs, setBudgetLogs] = useState([]);

  // Get report from endpoint
  const getReport = async () => {
    try {
      const response = await getData(
        "GET",
        `/events/EventReportFinance/${event.id}`,
        token
      );
      if (!response.ok) {
        throw new Error("Failed to fetch report");
      }
      const data = await response.json();
      setReportData(data.data);
    } catch (error) {
      console.error("Error fetching report:", error);
      addNotification({
        type: "error",
        message: "Error fetching report",
        title: "Error",
      });
    }
  };

  // Get event planners from endpoint
  const getEventPlanners = async () => {
    try {
      const response = await getData(
        "GET",
        `/events/event-planners/${event.id}`,
        token
      );
      if (!response.ok) {
        throw new Error("Failed to fetch event planners");
      }
      const res = await response.json();
      const planners = res.data.planners;
      console.log(planners);
      setEventPlanners(planners);
    } catch (error) {
      console.error("Error fetching event planners:", error);
      addNotification({
        type: "error",
        message: "Error fetching event planners",
        title: "Error",
      });
    }
  };

  // Get budget logs from endpoint
  const getBudgetLogs = async () => {
    try {
      const response = await getData(
        "GET",
        `/events/financeAuditLogs/${event.id}`,
        token
      );
      if (!response.ok) {
        throw new Error("Failed to fetch event budget logs");
      }
      const res = await response.json();
      console.log("Budget Logs:", res.data);
      setBudgetLogs(res.data);
    } catch (error) {
      console.error("Error fetching event budget logs:", error);
      addNotification({
        type: "error",
        message: "Error fetching event budget logs",
        title: "Error",
      });
    }
  };

  useEffect(() => {
    getReport();
    getEventPlanners();
    getBudgetLogs();
  }, []);

  // Calculate over budget amount for an itinerary
  const getOverBudget = (itinerary) => {
    const overBudget = parseFloat(itinerary.totalCost) - parseFloat(itinerary.budget);
    return overBudget.toFixed(2);
  };

  // Generate and download a PDF report
  const generatePDF = () => {
    const doc = new jsPDF();
    let yPos = 20;
    doc.setFontSize(16);
    doc.text("Finance Report", 10, yPos);
    doc.setFontSize(12);
    yPos += 10;
    doc.text(`Event: ${reportData.Event.name}`, 10, yPos);
    yPos += 10;
    doc.text(`Start Date: ${new Date(reportData.Event.startDate).toLocaleDateString()}`, 10, yPos);
    yPos += 10;
    doc.text(`End Date: ${new Date(reportData.Event.endDate).toLocaleDateString()}`, 10, yPos);
    yPos += 10;
    doc.text(`Current Budget: $${reportData.Event.currentBudget}`, 10, yPos);
    yPos += 10;
    doc.text(`Current Threshold: ${reportData.Event.currentThreshold}`, 10, yPos);
    yPos += 10;
    doc.text(`Approved Attendees: ${reportData.ApprovedAttendees}`, 10, yPos);
    yPos += 10;
    doc.text(`Total Attendees: ${reportData.TotalAttendees}`, 10, yPos);
    yPos += 10;
    doc.text(`Total Spent: $${reportData.TotalSpent}`, 10, yPos);
    yPos += 15;

    // Itineraries section
    doc.text("Itineraries:", 10, yPos);
    yPos += 10;
    const itineraryHeaders = ['Group', 'Total Cost', 'Ticket Cost', 'Tax', 'Budget', 'Threshold', 'Over Budget'];
    doc.text(itineraryHeaders.join(" | "), 10, yPos);
    yPos += 10;
    reportData.Event.Itineraries.forEach((itinerary) => {
      const row = [
        itinerary.groupname,
        `$${itinerary.totalCost}`,
        `$${itinerary.ticketCost}`,
        `$${itinerary.tax}`,
        `$${itinerary.budget}`,
        itinerary.threshold,
        `$${getOverBudget(itinerary)}`,
      ];
      doc.text(row.join(" | "), 10, yPos);
      yPos += 10;
    });
    yPos += 10;

    // Event Planners section
    doc.text("Event Planners:", 10, yPos);
    yPos += 10;
    eventPlanners.forEach((planner) => {
      doc.text(`${planner.User.FName} ${planner.User.LName} - ${planner.User.Email}`, 10, yPos);
      yPos += 10;
    });
    yPos += 10;

    // Budget Logs section
    doc.text("Budget Logs:", 10, yPos);
    yPos += 10;
    const budgetLogHeaders = ['Item', 'Date Edited', 'Editor', 'New Value', 'Prior Value'];
    doc.text(budgetLogHeaders.join(" | "), 10, yPos);
    yPos += 10;
    budgetLogs.forEach((log) => {
      const row = [
        log.changedItem,
        new Date(log.dateEdited).toLocaleString(),
        log.editor,
        log.newValue,
        log.priorValue,
      ];
      doc.text(row.join(" | "), 10, yPos);
      yPos += 10;
    });

    doc.save("finance_report.pdf");
  };

  // Generate and download CSV file
  const downloadCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    // Basic event info
    csvContent += "Metric,Value\n";
    csvContent += `Event Name,${reportData.Event.name}\n`;
    csvContent += `Start Date,${new Date(reportData.Event.startDate).toLocaleDateString()}\n`;
    csvContent += `End Date,${new Date(reportData.Event.endDate).toLocaleDateString()}\n`;
    csvContent += `Current Budget,$${reportData.Event.currentBudget}\n`;
    csvContent += `Current Threshold,${reportData.Event.currentThreshold}\n`;
    csvContent += `Approved Attendees,${reportData.ApprovedAttendees}\n`;
    csvContent += `Total Attendees,${reportData.TotalAttendees}\n`;
    csvContent += `Total Spent,$${reportData.TotalSpent}\n\n`;

    // Itineraries section
    csvContent += "Itineraries\n";
    csvContent += "Group,Total Cost,Ticket Cost,Tax,Budget,Threshold,Over Budget\n";
    reportData.Event.Itineraries.forEach((itinerary) => {
      const row = [
        itinerary.groupname,
        itinerary.totalCost,
        itinerary.ticketCost,
        itinerary.tax,
        itinerary.budget,
        itinerary.threshold,
        getOverBudget(itinerary),
      ];
      csvContent += row.join(",") + "\n";
    });
    csvContent += "\n";

    // Event Planners section
    csvContent += "Event Planners\n";
    csvContent += "Name,Email\n";
    eventPlanners.forEach((planner) => {
      csvContent += `${planner.User.FName} ${planner.User.LName},${planner.User.Email}\n`;
    });
    csvContent += "\n";

    // Budget Logs section
    csvContent += "Budget Logs\n";
    csvContent += "Item,Date Edited,Editor,New Value,Prior Value\n";
    budgetLogs.forEach((log) => {
      csvContent += `${log.changedItem},${new Date(log.dateEdited).toLocaleString()},${log.editor},${log.newValue},${log.priorValue}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "finance_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={styles.container}>
      <Header title="AirBlue System" />
      <main className={styles.main}>
        <h3 className={styles.pageEventTitle}>{event.title}</h3>
        <section className={styles.eventsSection}>
          <p className={styles.noEventsMessage}>
            No finance events found.
          </p>
          {reportData && (
            <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
              <h1>Finance Report</h1>
              <div
                style={{
                  marginBottom: "20px",
                  padding: "15px",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  backgroundColor: "#f9f9f9",
                }}
              >
                <p>
                  <strong>Event:</strong> {reportData.Event.name}
                </p>
                <p>
                  <strong>Start Date:</strong>{" "}
                  {new Date(reportData.Event.startDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>End Date:</strong>{" "}
                  {new Date(reportData.Event.endDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>Current Budget:</strong> ${reportData.Event.currentBudget}
                </p>
                <p>
                  <strong>Current Threshold:</strong>{" "}
                  {reportData.Event.currentThreshold}
                </p>
                <p>
                  <strong>Approved Attendees:</strong> {reportData.ApprovedAttendees}
                </p>
                <p>
                  <strong>Total Attendees:</strong> {reportData.TotalAttendees}
                </p>
                <p>
                  <strong>Total Spent:</strong> ${reportData.TotalSpent}
                </p>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <h2>Itineraries</h2>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    color: "#333",
                  }}
                >
                  <thead>
                    <tr>
                      <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                        Group
                      </th>
                      <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                        Total Cost
                      </th>
                      <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                        Ticket Cost
                      </th>
                      <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                        Tax
                      </th>
                      <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                        Budget
                      </th>
                      <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                        Threshold
                      </th>
                      <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                        Over Budget
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportData.Event.Itineraries.map((itinerary, index) => (
                      <tr key={index}>
                        <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                          {itinerary.groupname}
                        </td>
                        <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                          ${itinerary.totalCost}
                        </td>
                        <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                          ${itinerary.ticketCost}
                        </td>
                        <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                          ${itinerary.tax}
                        </td>
                        <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                          ${itinerary.budget}
                        </td>
                        <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                          {itinerary.threshold}
                        </td>
                        <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                          ${getOverBudget(itinerary)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <h2>Event Planners</h2>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    color: "#333",
                  }}
                >
                  <thead>
                    <tr>
                      <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                        Name
                      </th>
                      <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                        Email
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {eventPlanners.map((planner, index) => (
                      <tr key={index}>
                        <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                          {planner.User.FName} {planner.User.LName}
                        </td>
                        <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                          {planner.User.Email}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <h2>Budget Logs</h2>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    color: "#333",
                  }}
                >
                  <thead>
                    <tr>
                      <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                        Item
                      </th>
                      <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                        Date Edited
                      </th>
                      <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                        Editor
                      </th>
                      <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                        New Value
                      </th>
                      <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                        Prior Value
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {budgetLogs.map((log, index) => (
                      <tr key={index}>
                        <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                          {log.changedItem}
                        </td>
                        <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                          {new Date(log.dateEdited).toLocaleString()}
                        </td>
                        <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                          {log.editor}
                        </td>
                        <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                          {log.newValue}
                        </td>
                        <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                          {log.priorValue}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div>
                <button
                  onClick={generatePDF}
                  style={{
                    marginRight: "10px",
                    padding: "10px 15px",
                    backgroundColor: "#007BFF",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Download PDF
                </button>
                <button
                  onClick={downloadCSV}
                  style={{
                    padding: "10px 15px",
                    backgroundColor: "#28A745",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Download CSV
                </button>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default FinanceEventStatsPage;
