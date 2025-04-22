"use server";

export async function submitOrder(orderData) {

    try {
        const response = await fetch("https://admin.refabry.com/api/public/order/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(orderData),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Failed to submit order");
        }

        return { success: true, data: result };
    } catch (error) {
        console.error("Error submitting order:", error);
        return { success: false, error: error.message };
    }
}