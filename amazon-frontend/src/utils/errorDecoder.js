export function parseRevertReason(data) {
    // Check if data starts with "Reverted "
    const prefix = "Reverted ";
    if (data.startsWith(prefix)) {
        data = data.slice(prefix.length);
    }
  
    // Decode the remaining data
    if (data.startsWith('0x08c379a0')) {
        // Error(string) selector
        const reasonHex = data.slice(10); // Remove "0x08c379a0"
        const reasonBuffer = Buffer.from(reasonHex, 'hex');
        // Skip the length prefix (32 bytes / 64 hex characters)
        let reasonString = reasonBuffer.slice(32).toString('utf8').replace(/\x00/g, ''); // Trim null characters
        if (reasonString.length > 0 && reasonString.charCodeAt(0) < 32) {
            reasonString = reasonString.slice(1); // Trim first character if control character
        }
        return reasonString;
    }
  
    return "Reverted without a reason string";
  }