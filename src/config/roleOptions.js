import {
    faGlobe,
    faUser,
    faPlane,
    faMoneyBill,
    faChartBar,
    faCalendarPlus,
    faClipboardList,
    faHome,
    faCog,
  } from "@fortawesome/free-solid-svg-icons";
  
  const roleOptions = {
    admin: [
      { link: "/admin", icon: faUser, label: "Admin Panel" },
    ],
    eventPlanner: [
      { link: "/event-creation", icon: faCalendarPlus, label: "Create Event" },
      { link: "/manage-events", icon: faClipboardList, label: "My Events" },
      // { link: "/manage-attendees", icon: faUsers, label: "Manage Attendees" },
      // { link: "/manage-flights", icon: faPlane, label: "Manage-flights" },
    ],
    financePlanner: [
      { link: "/finance-details", icon: faMoneyBill, label: "Assign Budget" },
      { link: "/finance-events", icon: faChartBar, label: "Event List" },
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
  