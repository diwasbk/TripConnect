// Formatter to perfectly match your example string layout: MM/DD/YYYY, HH:MM AM/PM
export const formatDateTime = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    });
};

export const formatDate = (dateStr: string) =>{
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}