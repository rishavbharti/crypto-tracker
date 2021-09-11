import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import InfoCard from "../../components/InfoCard";

const useStyles = makeStyles((theme) => ({
    container: {
        padding: "4rem 12rem",
        background: "hsl(0, 0%, 98%)",
    },
    section: {
        display: "flex",
        justifyContent: "space-between",
    },
}));

const Features = () => {
    const classes = useStyles();

    const features = [
        {
            icon: "timeline",
            title: "Realtime data",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
        {
            icon: "assessment",
            title: "High quality charts",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
        {
            icon: "group",
            title: "Expert Analysis",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
        {
            icon: "chat_bubble_outline",
            title: "24x7 Support",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
    ];

    return (
        <section className={classes.container}>
            <h2 style={{ margin: "1rem 0 2rem 0" }}>Features</h2>
            <div className={classes.section}>
                {features.map(({ icon, title, description }) => (
                    <InfoCard
                        icon={icon}
                        title={title}
                        description={description}
                    />
                ))}
            </div>
        </section>
    );
};

export default Features;
