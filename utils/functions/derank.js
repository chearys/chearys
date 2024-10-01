export function derank(ign) {
    if (typeof ign !== 'string') {
        return '';
    }
    return ign.replace(/\[[\w+\+-]+] |\s*[⚒ቾ]\s*/g, "");
}