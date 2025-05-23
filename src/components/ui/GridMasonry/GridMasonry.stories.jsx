import React from "react";
import Index from "./index";

export default {
    title: "Components/Grid Masonry",
    component: Index,
    argTypes: {
        numCols: { control: { type: "number", min: 1, max: 6 } },
        strategy: { control: { type: "radio" }, options: ["filter", "partition"] },
    },
};

import { useState, useEffect } from "react";

import { Grid2, Typography, Box } from "@mui/material";

import { Link } from "react-router-dom";

import { Images, SampleData } from "@config";

import { Card, CardContent, CardActionArea } from "@mui/material";

import { clsUtility } from "@utility";

function ImageWithText(props) {
    const { children, imgProps = {} } = props;

    const style = {
        wrapper: {
            position: 'relative',
            width: '100%',
            height: '200px',
            overflow: 'hidden'
        },
        image: {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease-in-out',
            '&:hover': {
                transform: 'scale(1.05)'
            }
        },
        badge: {
            position: 'absolute',
            top: 16,
            right: 16,
            backgroundColor: 'error.main',
            padding: '6px 12px',
            borderRadius: '4px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
        },
        badgeText: {
            color: 'white',
            fontSize: '0.875rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
        }
    };

    return (
        <Box sx={style.wrapper}>
            <Box
                component="img"
                {...imgProps}
                sx={{
                    ...style.image,
                    ...imgProps?.sx
                }}
            />
            <Box sx={style.badge}>
                <Typography sx={style.badgeText}>
                    {children}
                </Typography>
            </Box>
        </Box>
    );
}

function InfoCard(props) {
    const { PK = "", title = "", subtitle = "" } = props;

    const imgIdx = clsUtility.genRandNum(0, 4);
    const imgArr = [Images.bgStock01, Images.bgStock02, Images.bgStock03, Images.bgStock04, Images.bgStock05];

    const style = {
        card: {
            width: '100%',
            transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
            '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }
        },
        platformIcon: {
            height: 24,
            width: 24,
            marginRight: 1.5
        },
        contentWrapper: {
            padding: 2
        },
        header: {
            display: 'flex',
            alignItems: 'center',
            marginBottom: 2
        },
        detailRow: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 1.5,
            '&:last-child': {
                marginBottom: 0
            }
        },
        label: {
            color: 'text.secondary',
            fontSize: '0.875rem',
            fontWeight: 500
        },
        value: {
            color: 'text.primary',
            fontSize: '0.875rem',
            fontWeight: 600
        },
        amount: {
            color: 'error.main',
            fontSize: '1rem',
            fontWeight: 700
        }
    };

    return (
        <Card sx={style.card}>
            <CardActionArea>
                <ImageWithText 
                    imgProps={{
                        src: imgArr[imgIdx],
                        alt: title
                    }}
                >
                    Fake Seller
                </ImageWithText>
                
                <Box sx={style.contentWrapper}>
                    {/* Header - Platform Icon & Name */}
                    <Box sx={style.header}>
                        <Box
                            component="img"
                            src={Images.facebook}
                            alt="Facebook"
                            sx={style.platformIcon}
                        />
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            Madge Santos
                        </Typography>
                    </Box>

                    {/* Amount Row */}
                    <Box sx={style.detailRow}>
                        <Typography sx={style.label}>
                            Amount Scammed
                        </Typography>
                        <Typography sx={style.amount}>
                            RM 9,999.99
                        </Typography>
                    </Box>

                    {/* Date Row */}
                    <Box sx={style.detailRow}>
                        <Typography sx={style.label}>
                            Date
                        </Typography>
                        <Typography sx={style.value}>
                            Feb 2, 2025
                        </Typography>
                    </Box>
                </Box>
            </CardActionArea>
        </Card>
    );
}

const Template = (args) => (
    <Index {...args}>
        {SampleData.Incident.map((item, index) => (
                    <InfoCard key={item.PK || index} {...item} />
                ))}
    </Index>
);

export const FilterStrategy = Template.bind({});
FilterStrategy.args = {
    numCols: 3,
    strategy: "filter",
};

export const PartitionStrategy = Template.bind({});
PartitionStrategy.args = {
    numCols: 3,
    strategy: "partition",
};
