import HtmlToPdf from "@/components/HtmlToPdf";
import Button from "@/components/ui/Button";
import { formatDateToLocale } from "@/utils/dateUtils";
import { formatCurrency } from "@/utils/numberUtils";
import {
  ClipPath,
  Defs,
  Document,
  Font,
  G,
  Link,
  Page,
  Path,
  PDFDownloadLink,
  PDFViewer,
  Rect,
  StyleSheet,
  Svg,
  Text,
  View,
} from "@react-pdf/renderer";
import { Download } from "lucide-react";
import { createTw } from "react-pdf-tailwind";

Font.register({
  family: "NotoSans",
  // src: "https://fonts.gstatic.com/s/notosans/v6/LeFlHvsZjXu2c3ZRgBq9nKCWcynf_cDxXwCLxiixG1c.ttf",
  src: `${process.env.NEXT_PUBLIC_APP_URL}/NotoSans-Regular.ttf`,
});

const styles = StyleSheet.create({
  page: { padding: 20, fontSize: 10, fontFamily: "NotoSans" },
  pageBreak: {
    break: true,
  },
});

const tw = createTw(
  {
    theme: {
      extend: {
        colors: {
          custom: "#bada55",
        },
      },
    },
  },
  {
    ptPerRem: 12,
  }
);

const TaxInvoice = ({ data }) => {
  console.log("TaxInvoice data:", data);
  const {
    storeProfile,
    billing,
    shipping,
    invoiceSummary,
    shipment,
    invoiceNumber,
    invoiceDate,
  } = data;
  const orderNumber = data?.order?.orderNumber || "N/A";
  const orderedItems = data?.products;

  return (
    <Document>
      <Page size="A4" style={styles?.page} wrap>
        <View style={tw("flex flex-row items-start justify-between w-full")}>
          <JashCeramicLogoSVG />
          <View
            style={tw(
              "flex flex-col items-end text-xs leading-tight max-w-72 text-right"
            )}
          >
            <Text style={tw("text-lg font-medium")}>{storeProfile?.name}</Text>
            <Text>
              {storeProfile?.address?.addressLine1},
              {storeProfile?.address?.addressLine2}
            </Text>
            {storeProfile?.address?.landmark && (
              <Text>{storeProfile?.address?.landmark}</Text>
            )}
            <Text>
              {storeProfile?.address?.city},{storeProfile?.address?.state},
              {storeProfile?.address?.zipCode}
            </Text>
            <Text>GST: {storeProfile?.gst}</Text>
            <Text>CIN: {storeProfile?.cin}</Text>
          </View>
        </View>
        <View style={tw("w-full border-b border-gray-200 pb-2")}>
          <Text style={tw("text-2xl font-medium leading-none")}>
            Tax Invoice - {invoiceNumber}
          </Text>
        </View>
        <View
          style={tw(
            "flex flex-row items-start gap-4 flex-nowrap justify-between w-full"
          )}
        >
          <View style={tw("w-1/3 p-2 text-base text-xs leading-tight")}>
            <Text style={tw("text-base font-medium")}>
              Order: {orderNumber}
            </Text>
            <Text>
              Date:{" "}
              {formatDateToLocale(invoiceDate, "en-IN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Text>
            <Text>Amount: {formatCurrency(invoiceSummary?.total)}</Text>
            <Text>
              Place of supply: {shipping?.state}, Code:{" "}
              {shipping?.stateCode}{" "}
            </Text>
            <Text>E-waybill No: {shipment?.waybillNumber || "NA"}</Text>
            <Text>Vehicle No: {shipment?.vehicleNumber || "NA"}</Text>
          </View>
          <View style={tw("w-1/3 p-2 text-xs leading-tight")}>
            <Text style={tw("text-base font-medium")}>Shipping</Text>
            <Text>{shipping?.name}</Text>
            <Text>+91-{shipping?.contact}</Text>
            <Text>
              {shipping?.addressLine1}, {shipping?.addressLine2}
            </Text>
            <Text>
              {shipping?.city}, {shipping?.state} - {shipping?.pinCode}
            </Text>
          </View>
          <View style={tw("w-1/3 p-2 text-xs leading-tight")}>
            <Text style={tw("font-medium text-base")}>Billing</Text>
            <Text>{billing?.name}</Text>
            <Text>+91-{billing?.contact}</Text>
            <Text>
              {billing?.addressLine1}, {billing?.addressLine2}
            </Text>
            <Text>
              {billing?.city}, {billing?.state} - {billing?.pinCode}
            </Text>
          </View>
        </View>
        <View style={tw("w-full mt-2")}>
          <View>
            <View
              style={tw(
                "border-y border-gray-200 flex flex-row justify-between gap-2 py-1 text-sm bg-gray-50 font-medium px-2"
              )}
            >
              <Text style={tw("w-60 text-left")}>Code</Text>
              <Text style={tw("w-72 text-left")}>Title</Text>
              <Text style={tw("w-40 text-left")}>HSN</Text>
              <Text style={tw("w-40 text-center")}>Unit Price</Text>
              <Text style={tw("w-28 text-center")}>Qty</Text>
              <Text style={tw("w-40 text-center")}>Discount</Text>
              <Text style={tw("w-40 text-center")}>Tax</Text>
              <Text style={tw("w-40 text-center")}>Line Total</Text>
            </View>
            {orderedItems?.map((item) => (
              <View
                key={item._id}
                style={tw(
                  "flex flex-row justify-between gap-2 text-xs py-3 px-2 border-b border-gray-100"
                )}
              >
                <Text style={tw("w-60")}>{item?.SKU}</Text>
                <Text style={tw("w-72")}>{item?.title}</Text>

                <Text style={tw("w-40")}>{item?.tax?.hsnCode}</Text>
                <Text style={tw("w-40 text-center")}>
                  {formatCurrency(item?.price.retailPrice)}
                </Text>
                <Text style={tw("w-28 text-center")}>{item?.quantity}</Text>
                <Text style={tw("w-40 text-center")}>
                  {item?.price?.discount?.percentage}%
                </Text>
                <Text style={tw("w-40 text-center")}>
                  {item?.tax?.percentage}%
                </Text>
                <Text style={tw("w-40 text-right")}>
                  {formatCurrency(item?.price?.lineTotal)}
                </Text>
              </View>
            ))}
          </View>
        </View>
        {orderedItems?.length >= 10 && <View break style={tw("h-1")}></View>}
        <View style={tw("w-full flex flex-row items-start justify-end mt-4")}>
          <View
            style={tw(
              "flex flex-col items-start text-xs w-2/5 p-2 rounded border border-gray-100"
            )}
          >
            <Text style={tw("text-base font-medium")}>Summary</Text>

            <View
              style={tw(
                "flex flex-row justify-between w-full items-start mb-2"
              )}
            >
              <Text>Subtotal: </Text>
              <Text style={tw("text-right")}>
                {formatCurrency(invoiceSummary?.subtotal)}
              </Text>
            </View>
            <View
              style={tw(
                "flex flex-row justify-between w-full items-start mb-2"
              )}
            >
              <Text>Discount: </Text>
              <Text style={tw("text-right")}>
                - {formatCurrency(invoiceSummary?.discount)}
              </Text>
            </View>
            <View
              style={tw(
                "flex flex-row justify-between w-full items-start mb-2"
              )}
            >
              <Text>Tax:</Text>
              {invoiceSummary?.taxType === "GST" ? (
                <View style={tw("text-right")}>
                  <Text>CGST: {formatCurrency(invoiceSummary?.tax / 2)}</Text>
                  <Text>SGST: {formatCurrency(invoiceSummary?.tax / 2)}</Text>
                </View>
              ) : (
                <Text style={tw("text-right")}>
                  IGST: {formatCurrency(invoiceSummary?.tax)}
                </Text>
              )}
            </View>

            <View
              style={tw(
                "flex flex-row justify-between w-full items-start mb-2"
              )}
            >
              <Text>Shipping Charges: </Text>
              <Text style={tw("text-right")}>
                + {formatCurrency(invoiceSummary?.shippingCharges)}
              </Text>
            </View>
            <View
              style={tw(
                "flex flex-row justify-between w-full items-start mb-2"
              )}
            >
              <Text>Adjustment: </Text>
              <Text style={tw("text-right")}>
                {invoiceSummary?.adjustment?.with === "subtract" && "-"}{" "}
                {invoiceSummary?.adjustment?.with === "add" && "+"}
                {formatCurrency(invoiceSummary?.adjustment?.amount)}
              </Text>
            </View>
            <View
              style={tw(
                "flex flex-row justify-between w-full items-start mb-2"
              )}
            >
              <Text>Roundoff: </Text>
              <Text style={tw("text-right")}>
                {invoiceSummary?.roundoff?.with === "subtract" ? "-" : "+"}{" "}
                {formatCurrency(invoiceSummary?.roundoff?.amount)}
              </Text>
            </View>
            <View
              style={tw(
                "flex flex-row justify-between w-full items-start mb-2"
              )}
            >
              <Text>Total: </Text>
              <Text style={tw("text-right")}>
                {formatCurrency(invoiceSummary?.total)}
              </Text>
            </View>
          </View>
        </View>
        {console.log("Terms and Conditions: ", data)}
        <HtmlToPdf
          html={data?.termsAndConditions || ""}
          style={tw("mt-4 text-xs")}
        />
        <View
          style={tw(
            "absolute bottom-4 left-8 right-8 w-auto flex flex-row items-center justify-between"
          )}
          fixed
        >
          {/* <SkentinoLogoSVG /> */}
          <View />
          <View style={tw("flex flex-col items-end")}>
            <Text style={tw("text-right")}>Generated By Skentino</Text>
            <Text style={tw("text-right")}>
              <Link href="https://skentino.com" style={tw("text-gray-600")}>
                www.skentino.com
              </Link>
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

const TaxInvoicePDF = ({ data }) => (
  <div className="flex w-auto items-end justify-end">
    <PDFDownloadLink
      document={<TaxInvoice data={data} />}
      fileName={`Tax_Invoice_${data?.invoiceNumber}.pdf`}
    >
      {({ loading }) => (
        <Button
          disabled={loading}
          variant="outline"
          className="flex w-auto items-center gap-2 py-2 text-sm"
        >
          {loading ? (
            "Generating PDF..."
          ) : (
            <>
              <Download size={16} />
              Download Invoice
            </>
          )}
        </Button>
      )}
    </PDFDownloadLink>
    <PDFViewer style={{ width: "100%", height: "500px" }}>
      <TaxInvoice data={data} />
    </PDFViewer>
  </div>
);

const JashCeramicLogoSVG = () => (
  <Svg width="71" height="46" viewBox="0 0 71 46">
    <Defs>
      <ClipPath id="clip0_930_641">
        <Rect width="70.9184" height="46" fill="white" />
      </ClipPath>
    </Defs>
    <G clipPath="url(#clip0_930_641)">
      <Path
        d="M65.3247 12.1679L70.1556 7.65476C66.1616 1.74323 58.3114 -0.555706 51.2027 0.111725C45.1958 0.673215 39.1889 3.18403 35.375 7.85605C32.5888 11.2568 31.1056 15.6216 30.809 20.0075C30.6077 22.8785 30.8937 25.7813 30.5653 28.6418C30.2369 31.5022 29.1669 34.4474 26.8679 36.1848C25.3 37.3713 23.3189 37.8693 21.3696 38.1659C18.2019 38.6532 14.6423 38.5791 12.2162 36.492C9.66303 34.299 9.14392 30.6017 8.8049 27.2433C5.9233 27.148 3.05228 27.042 0.170673 26.9467C-0.54973 26.9255 1.18771 32.6358 2.07762 35.4538C2.33188 36.206 2.53317 36.7463 2.61792 36.9052C4.2918 40.0411 6.41063 42.2764 9.63125 43.7808C15.7759 46.6518 23.2129 46.7472 29.3787 43.855C33.0549 42.1281 36.3497 39.2783 37.8329 35.5068C40.1212 29.7012 37.8435 22.8997 39.9623 17.0306C41.6786 12.2844 46.2658 8.83071 51.2451 8.03615C56.2137 7.24159 61.4366 8.94725 65.3247 12.1679Z"
        fill="#064150"
      />
      <Path
        d="M42.1023 32.6357L38.7334 41.503C38.7334 41.503 54.5398 52.5845 70.9184 39.9563L65.2293 33.9812C65.2187 33.9812 53.5758 44.4906 42.1023 32.6357Z"
        fill="#064150"
      />
      <Path
        d="M17.5345 1.05462H36.6145C36.6463 1.01224 31.2963 8.67181 30.8301 8.50231C30.3746 8.32221 17.5345 8.50231 17.5345 8.50231V1.05462Z"
        fill="#064150"
      />
    </G>
  </Svg>
);

export default TaxInvoicePDF;
