import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";

const ScoreCard = ({ card, onClick, disabled }) => {
  const isSelected = !!card.selectedBy;

  return (
    <Card sx={{ width: 200, padding: "10px" }}>
      <CardActionArea
        disabled={isSelected || disabled}
        onClick={onClick}
        sx={{
          ":disabled": {
            cursor: "not-allowed",
            pointerEvents: "all !important",
          },
        }}
      >
        <CardContent
          component={Grid}
          container
          sx={{
            height: 300,
            bgcolor: isSelected && "grey.300",
            alignItems: "center",
          }}
        >
          <Typography component={Grid} item xs={12} fontSize={20}>
            {isSelected && card.selectedBy}
          </Typography>
          <Typography component={Grid} item xs={12} fontSize={30}>
            {isSelected && card.score}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ScoreCard;
