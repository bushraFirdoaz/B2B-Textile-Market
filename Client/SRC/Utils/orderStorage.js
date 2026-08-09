export const getOrderShippingInfo = () => {
  return JSON.parse(
    localStorage.getItem("orderShippingInfo")
  ) || {};
};


export const saveOrderShippingInfo = (
  orderId,
  shippingData
) => {

  const allShippingInfo =
    getOrderShippingInfo();

  allShippingInfo[orderId] = {
    ...(allShippingInfo[orderId] || {}),
    ...shippingData,
  };

  localStorage.setItem(
    "orderShippingInfo",
    JSON.stringify(allShippingInfo)
  );

  // Allows components in the same browser tab
  // to know that the data changed.
  window.dispatchEvent(
    new Event("orderShippingInfoUpdated")
  );
};


export const getShippingForOrder = (orderId) => {

  const allShippingInfo =
    getOrderShippingInfo();

  return allShippingInfo[orderId] || {};
};