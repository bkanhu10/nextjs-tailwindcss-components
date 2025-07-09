const recentOrdersBadgeColor = (status) => {
  switch (status) {
    case "initiated":
      return "border-gray-500 text-gray-700";
    case "processed":
      return "border-sky-500 text-sky-700";
    case "placed":
      return "border-emerald-600 text-emerald-700";
    case "confirmed":
      return "border-cyan-600 text-cyan-700";
    case "shipped":
      return "border-blue-600 text-blue-700";
    case "delivered":
      return "border-violet-600 text-violet-700";
    case "replacement":
      return "border-lime-500 text-lime-600";
    case "returned":
      return "border-zinc-500 text-zinc-600";
    case "cancelled":
      return "border-rose-600 text-rose-700";
    case "aborted":
      return "border-amber-500 text-amber-600";
    case "failed":
      return "border-orange-600 text-orange-700";
    case "failed & refunded":
      return "border-red-500 text-red-700";
    default:
      return "border-gray-300 text-gray-500";
  }
};

const recentQuoteBadgeColor = (status) => {
  switch (status) {
    case "pending":
      return "border-brand-950 text-brand-950";
    case "inprogress":
      return "border-amber-600 text-amber-700";
    case "paid":
      return "border-emerald-600 text-emerald-700";
    case "shipped":
      return "border-blue-600 text-blue-700";
    case "delivered":
      return "border-violet-600 text-violet-700";
    case "approved":
      return "border-cyan-600 text-cyan-700";
    case "rejected":
      return "border-rose-600 text-rose-700";
    default:
      return "border-gray-300 text-gray-500";
  }
};

const renderRazorpayOrderStatusBadge = (status) => {
  switch (status) {
    case "paid":
      return "border-emerald-600 text-emerald-700";
    case "created":
      return "border-amber-500 text-amber-600";
    case "placed":
      return "border-cyan-600 text-cyan-700";
    default:
      return "border-gray-400 text-gray-500";
  }
};

const renderRazorpayPaymentStatusBadge = (status) => {
  switch (status) {
    case "captured":
      return "border-emerald-600 text-emerald-700";
    case "created":
      return "border-amber-500 text-amber-600";
    case "placed":
      return "border-cyan-600 text-cyan-700";
    default:
      return "border-gray-400 text-gray-500";
  }
};

const renderActiveInactiveBagde = (status) => {
  switch (status) {
    case true:
      return "border-green-600 text-green-600";
    case false:
      return "border-red-500 text-red-500";
  }
};

export {
  recentOrdersBadgeColor,
  recentQuoteBadgeColor,
  renderActiveInactiveBagde,
  renderRazorpayOrderStatusBadge,
  renderRazorpayPaymentStatusBadge,
};
