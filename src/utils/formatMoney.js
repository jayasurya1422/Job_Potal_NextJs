export default function formatMoney(amt) {
    let formatter = new Intl.NumberFormat('en-IN');
    return formatter.format(amt);
}


