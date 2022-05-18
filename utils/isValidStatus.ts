const validStatuses = ["pending", "draft"]

export const isValidStatus = (orderStatus?: string) =>
  validStatuses.includes(orderStatus || "")
