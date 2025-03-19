import {
    faGlobe,
    faUser,
    faPlane,
    faMoneyBill,
    faChartBar,
    faCalendarPlus,
    faUsers,
    faClipboardList,
    faHome,
    faCog,
  } from "@fortawesome/free-solid-svg-icons";
  
  const roleOptions = {
    admin: [
      { link: "/admin", icon: faUser, label: "Admin Panel" },
    ],
    eventPlanner: [
      { link: "/create-event", icon: faCalendarPlus, label: "Create Event" },
      { link: "/manage-events", icon: faClipboardList, label: "Manage Events" },
      { link: "/manage-attendees", icon: faUsers, label: "Manage Attendees" },
      { link: "/approve-flights", icon: faPlane, label: "Approve Flights" },
    ],
    financePlanner: [
      { link: "/finance-events", icon: faMoneyBill, label: "Assign Budget" },
      { link: "/event-stats", icon: faChartBar, label: "Event Statistics" },
    ],
    attendee: [
      { link: "/my-events", icon: faGlobe, label: "My Events" },
      { link: "/select-flight", icon: faPlane, label: "Select Flight" },
    ],
  };
  
  // Append Account Settings (Sidebar only)
  const sidebarOptions = Object.fromEntries(
    Object.entries(roleOptions).map(([role, options]) => [
      role,
      [{ link: "/home", icon: faHome, label: "Home" }, ...options, { link: "/user-info", icon: faCog, label: "User Info" }],
    ])
  );
  
  export { roleOptions, sidebarOptions };
  