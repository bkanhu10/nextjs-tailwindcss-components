"use client";
import { formatCurrency } from "@/utils/numberUtils";
const OrderSummary = ({ orderSummaryData }) => {
  console.log(orderSummaryData);
  return (
    <div className="rounded-md bg-white p-4 shadow">
      <h2 className="mb-4 text-xl font-semibold text-gray-900">
        Order summary
      </h2>
      <div className="space-y-4">
        <div className="space-y-2">
          {/* <dl className="flex items-center justify-between gap-4">
            <dt className="text-base font-normal text-gray-500">Subtotal</dt>
            <dd className="text-base font-medium capitalize text-gray-900">
              {formatCurrency(orderSummaryData?.subTotal)}
            </dd>
          </dl> */}
          {orderSummaryData?.map((item) => {
            return (
              <dl
                className="flex items-center justify-between gap-4"
                key={item?.name}
              >
                <dt className="text-base font-normal text-gray-500">
                  {item?.name}
                </dt>
                <dd className="text-base font-medium capitalize text-gray-900">
                  {formatCurrency(item?.value)}
                </dd>
              </dl>
            );
          })}

          {/* <dl className="flex items-center justify-between gap-4">
            <dt className="text-base font-normal text-gray-500">Tax</dt>
            <dd className="text-base font-medium capitalize text-gray-900">
              {formatCurrency(orderSummaryData?.tax)}
            </dd>
          </dl> */}
        </div>
        {/* <dl className="flex items-center justify-between gap-4">
            <dt className="text-base font-normal text-gray-500">Shipping</dt>
            <dd className="text-base font-medium capitalize text-gray-900">
              {formatCurrency(orderSummaryData?.shipping)}
            </dd>
          </dl>
       
        <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
          <dt className="text-base font-bold text-gray-900">Total</dt>
          <dd className="text-base font-bold text-gray-900">
            {formatCurrency(orderSummaryData?.total)}
          </dd>
        </dl> */}
      </div>
    </div>
  );
};

export default OrderSummary;
