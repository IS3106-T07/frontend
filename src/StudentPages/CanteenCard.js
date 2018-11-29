import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography/Typography';
import CardContent from '@material-ui/core/CardContent/CardContent';
import { BACKEND_HOST } from '../_api/constants';

const styles = {
  card: {
    width: '40vw',
    display: '-webkit-inline-box',
    marginTop: 10,
    position: 'relative',
  },
  media: {
    height: '40vw',
  },
  wrapper: {
    width: '100%',
  },
  name: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    padding: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    width: '100%',
    textAlign: 'center',
  },
};

function CanteenCard(props) {
  const { classes, canteen } = props;
  const defaultPhoto = canteen.name === 'Deck'
    ? '../../../img/deck.png'
    : canteen.name === 'FineFood'
      ? '../../../img/fineFood.png'
      : '../../../img/foodClique.png';
  return (
    <div className={classes.wrapper}>
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            // image="../../../img/deck.png"
            image={
              canteen.photoDir === undefined || canteen.photoDir === null
                ? defaultPhoto
                : `${BACKEND_HOST}${canteen.photoDir}`
            }
            title={canteen.name}
          />
          <CardContent className={classes.name}>
            <Typography variant="h4">{canteen.name}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}

export default withStyles(styles)(CanteenCard);
