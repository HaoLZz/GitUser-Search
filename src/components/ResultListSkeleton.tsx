import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

function ListItemSkeleton() {
  return (
    <Box
      sx={{
        height: "65px",
        display: "flex",
        alignContent: "center",
        padding: "0 15px",
      }}
    >
      <Skeleton
        animation="wave"
        variant="circular"
        width={40}
        height={40}
        sx={{ marginRight: "10px" }}
      />
      <Skeleton
        animation="wave"
        variant="rounded"
        height={40}
        sx={{ width: "calc(100% - 40px - 10px)" }}
      />
    </Box>
  );
}

export default function ResultListSkeleton({ totalNum }: { totalNum: number }) {
  const contentToRender = Array.from(
    { length: totalNum },
    (_, i: number) => i
  ).map((i) => {
    return <ListItemSkeleton key={i} />;
  });
  return <>{contentToRender}</>;
}
