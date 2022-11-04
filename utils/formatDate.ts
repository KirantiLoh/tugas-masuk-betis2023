export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const formatedDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000 ))
                    .toISOString()
                    .split("T")[0];
    return formatedDate;
}