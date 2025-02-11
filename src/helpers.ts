const formatter = new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
});

export function formatDate(date: Date) {
    return formatter.format(date);
}