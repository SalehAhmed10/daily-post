import CardPageLoading from "@/components/blocks/CardPageLoading";
import Container from "@/components/ui/container";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <Container>
      <CardPageLoading />
    </Container>
  );
}
