"use client";
import OneCustomerInfoCard from "@/app/components/one_customer_info_card.jsx";
import fetchCustomer from "./fetchCustomer";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react"; // Suspenseを追加

// 1. ロジック部分を別のコンポーネント（ConfirmContent）に切り出し
function ConfirmContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const customer_id = searchParams.get("customer_id");
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    // customer_idがある場合のみ実行する安全策を追加
    if (!customer_id) return;

    const fetchAndSetCustomer = async () => {
      const customerData = await fetchCustomer(customer_id);
      setCustomer(customerData);
    };
    fetchAndSetCustomer();
  }, [customer_id]); // 依存配列にcustomer_idを追加

  return (
    <div className="card bordered bg-white border-blue-200 border-2 max-w-sm m-4">
      <div className="alert alert-success p-4 text-center">
        正常に作成しました
      </div>
      <OneCustomerInfoCard {...customer} />
      <button onClick={() => router.push("./../../customers")}>
        <div className="btn btn-primary m-4 text-2xl">戻る</div>
      </button>
    </div>
  );
}

// 2. メインのページコンポーネントでSuspenseを使ってラップする
export default function ConfirmPage() {
  return (
    // fallbackには読み込み中に表示したいローディング表示を入れます
    <Suspense fallback={<div className="text-center p-4">Loading...</div>}>
      <ConfirmContent />
    </Suspense>
  );
}