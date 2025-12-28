import OneCustomerInfoCard from "@/app/components/one_customer_info_card.jsx";

async function fetchCustomer(id) {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_ENDPOINT + `/customers?customer_id=${id}`,
    { cache: "no-store" } // 常に最新データを取得するためキャッシュを無効化
  );
  if (!res.ok) {
    throw new Error("Failed to fetch customer");
  }
  return res.json();
}

// 修正ポイント: 引数を { query } ではなく { searchParams } に変更
export default async function ReadPage({ searchParams }) {
  // 修正ポイント: Next.js 15では searchParams を await する必要がある
  const params = await searchParams;
  const id = params?.id; // または params?.customer_id (URLパラメータ名に合わせてください)

  // 修正ポイント: ビルド時など ID がない場合は処理を中断してエラーを防ぐ
  if (!id) {
    return <div className="alert alert-warning m-4">IDが指定されていません</div>;
  }

  const customerInfo = await fetchCustomer(id);

  return (
    <>
      <div className="alert alert-success">更新しました</div>
      <div className="card bordered bg-white border-blue-200 border-2 max-w-sm m-4">
        {/* データが配列の場合は[0]を取得 */}
        <OneCustomerInfoCard {...(Array.isArray(customerInfo) ? customerInfo[0] : customerInfo)} />
      </div>
      <button className="btn btn-outline btn-accent">
        <a href="/customers">一覧に戻る</a>
      </button>
    </>
  );
}