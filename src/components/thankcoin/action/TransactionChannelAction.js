
// Kargo (action) nesnesi.
export function transactionChannelAction(transaction) {
    return {
        type: 'TRANSACTION_CHANNEL',   // Kargonun türü, başlığı
        transaction   // Kargo kutusunun içindeki şey.
    };
}
