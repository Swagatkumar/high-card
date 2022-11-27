import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Box,
} from "@mui/material";

const ScoreCard = ({ card, onClick }) => {
  return (
    <Card sx={{ width: 200, padding: "10px" }}>
      <CardActionArea
        disabled={card.isSelected}
        onClick={onClick}
        sx={{
          ":disabled": {
            cursor: "not-allowed",
            pointerEvents: "all !important",
          },
        }}
      >
        <CardContent
          component={Box}
          display="flex"
          sx={{
            height: 300,
            bgcolor: card.isSelected && "grey.300",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography display="inline" fontSize={40}>
            {card.isSelected && card.score}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ScoreCard;
