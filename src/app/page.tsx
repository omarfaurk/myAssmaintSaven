import Banner from "@/component/Banner";
import Highprice from "@/component/Highprice";
import Lowprice from "@/component/Lowprice";
import Totalproducts from "@/component/Totalproducts";


export default function Home() {
  return (
    <div>
      <Banner />
      <Highprice />
      <Lowprice />
      <Totalproducts />
    </div>
  );
}