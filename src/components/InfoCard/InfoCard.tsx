import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";

import CardContent from "@material-ui/core/CardContent";

import Typography from "@material-ui/core/Typography";

import AssessmentIcon from "@material-ui/icons/Assessment";

const useStyles = makeStyles({
    root: {
        maxWidth: 245,
    },
});

interface Props {
    icon: string;
    title: string;
    description: string;
}

export default function InfoCard(props: Props) {
    const classes = useStyles();

    const { title, description } = props;

    return (
        <Card className={classes.root}>
            <CardActionArea>
                {/* <Icon fontSize="medium">{icon}</Icon> */}
                <AssessmentIcon fontSize="large" />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="h2">
                        {title}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                    >
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
