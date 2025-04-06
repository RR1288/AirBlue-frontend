export const Roles = Object.freeze({
    ADMIN: "A",
    FINANCE: "F",
    PLANNER: "E",
    ATTENDEE: "attendee",
});

/**
 * Get default role based on priority (A > E > F > attendee)
 * @param {string} rolesStr - e.g. "AFE", "", "F"
 * @returns {string} - one of "admin", "eventPlanner", "financePlanner", "attendee"
 */
export const getDefaultRole = (rolesStr = "") => {
    if (rolesStr.includes(Roles.ADMIN)) return "admin";
    if (rolesStr.includes(Roles.PLANNER)) return "eventPlanner";
    if (rolesStr.includes(Roles.FINANCE)) return "financePlanner";
    return Roles.ATTENDEE;
};

export const hasRole = (rolesStr, roleCode) => rolesStr.includes(roleCode);
