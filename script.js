function sumInputs(className) {
  let total = 0;
  document.querySelectorAll("." + className).forEach(input => {
    total += Number(input.value) || 0;
  });
  return total;
}

function calculate() {
  let income = Number(document.getElementById("income").value);

  let essentialTotal = sumInputs("essential");
  let nonTotal = sumInputs("non");
  let savingsTotal = sumInputs("savings");

  // totals
  document.getElementById("essentialTotal").innerText = essentialTotal;
  document.getElementById("nonTotal").innerText = nonTotal;
  document.getElementById("savingsTotal").innerText = savingsTotal;

  // available income LEFT (not 50/30/20)
  document.getElementById("essentialAvailable").innerText = income - essentialTotal;
  document.getElementById("nonAvailable").innerText = income - essentialTotal - nonTotal;
  document.getElementById("savingsAvailable").innerText = income - essentialTotal - nonTotal - savingsTotal;

  // status (simple logic, no %)
  document.getElementById("essentialStatus").innerText =
    essentialTotal > income ? "Over Budget" : "OK";

  document.getElementById("nonStatus").innerText =
    (essentialTotal + nonTotal) > income ? "Too High" : "OK";

  // ✅ PURE RECOMMENDATION (NO % RULE)
  let advice = "";

  if (savingsTotal === 0) {
    advice += "⚠️ You are not saving any money. Try setting aside some savings.\n";
  } else if (savingsTotal < essentialTotal) {
    advice += "💡 Your savings are low compared to expenses. Consider increasing savings.\n";
  } else {
    advice += "🔥 Good job! You are saving a healthy amount.\n";
  }

  if (essentialTotal > income) {
    advice += "• Your essential expenses exceed your income. Reduce necessary spending.\n";
  }

  if ((essentialTotal + nonTotal) > income) {
    advice += "• You're spending more than you earn. Cut non-essential expenses.\n";
  }

  if ((income - (essentialTotal + nonTotal + savingsTotal)) > 0) {
    advice += "• You still have remaining money. Consider saving or investing it.";
  }

  document.getElementById("adviceText").innerText = advice;
}
