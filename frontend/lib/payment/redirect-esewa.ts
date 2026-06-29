// Redirect To eSewa
export const redirectEsewa = (res: any) => {
    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

    const fields = {
        amount: res.result.amount,
        tax_amount: res.result.tax_amount,
        total_amount: res.result.total_amount,
        transaction_uuid: res.result.transaction_uuid,
        product_code: res.result.product_code,
        product_service_charge: 0,
        product_delivery_charge: 0,
        success_url: res.result.success_url,
        failure_url: res.result.failure_url,
        signed_field_names: "total_amount,transaction_uuid,product_code",
        signature: res.result.signature
    };

    for (const key of Object.keys(fields) as (keyof typeof fields)[]) {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = String(fields[key]);
        form.appendChild(input);
    };

    document.body.appendChild(form);
    form.submit();
};