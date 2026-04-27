import sanitizeHtml from "sanitize-html";

export function cleanHTML(input) {
    return sanitizeHtml(input, {
        allowedTags: ["b","i","strong","a","p"],
        allowedAttributes: { a: ["href"] }
    });
}