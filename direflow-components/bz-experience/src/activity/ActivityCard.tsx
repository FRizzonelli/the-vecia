import { Button } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import MonetizationOnRoundedIcon from "@material-ui/icons/MonetizationOnRounded";
import { Styled } from "direflow-component";
import React from "react";
import styles from "./ActivityCard.css";

function ActivityCard(props) {
  const { activity, onToggleActivityPresence, isPicked } = props;

  const [expanded, setExpanded] = React.useState<string | false>("");

  const handleChange = (panel: string) => (
    event: React.ChangeEvent<{}>,
    newExpanded: boolean
  ) => {
    setExpanded(newExpanded ? panel : false);
  };

  function handleJoin() {
    onToggleActivityPresence(activity);
  }

  return (
    <Styled styles={styles}>
      <Card
        className="card"
        onClick={handleJoin}
        style={
          isPicked
            ? {
                borderWidth: 4,
                borderColor: "#50742F",
                borderStyle: "solid"
              }
            : {}
        }
      >
        <CardActionArea>
          <img className="card-image" src={activity.images[0]} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {activity.title}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <MuiExpansionPanel
            square={true}
            elevation={0}
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <MuiExpansionPanelSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <div className="icon-container">
                <div className="price-duration-container">
                  <div className="icon-label">
                    <MonetizationOnRoundedIcon />
                    <Typography>{`${activity.price || 1}€`}</Typography>
                  </div>
                  <div className="icon-label">
                    <AccessTimeIcon />
                    <Typography>{`${activity.duration || 1}h`}</Typography>
                  </div>
                  <div className="icon-label">
                    {isPicked && <CheckCircleIcon htmlColor="#50742F"/>}
                  </div>
                </div>
                <div className="icon-expand">
                  {expanded === "panel1" ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )}
                </div>
              </div>
            </MuiExpansionPanelSummary>
            <MuiExpansionPanelDetails>
              <div>
                <div
                  dangerouslySetInnerHTML={{ __html: activity.description }}
                />
                <div className="description-container">
                  {!isPicked && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleJoin}
                    >
                      Partecipa
                    </Button>
                  )}
                </div>
              </div>
            </MuiExpansionPanelDetails>
          </MuiExpansionPanel>
        </CardActions>
      </Card>
    </Styled>
  );
}

export default ActivityCard;
