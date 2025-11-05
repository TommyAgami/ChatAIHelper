export async function sendLeadToMake({ name, phone, specialty }) {
  try {
    const res = await fetch("https://hook.eu2.make.com/vpg477tgaj9fjd20s3fkxvgfvlxzrb5g", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        phone,
        specialty,
        source: "Website AI Chat"
      }),
    });

    return res.ok;
  } catch (err) {
    console.error("Make webhook error:", err);
    return false;
  }
}
