export const formatDate = (date: Date): string => {
        let curr_date = date.getDate();
        let curr_month = date.getMonth() + 1;
        let curr_year = date.getFullYear();
        return curr_year + "/" + curr_month + "/" + curr_date;
}