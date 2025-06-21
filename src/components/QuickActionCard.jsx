import React from "react";
import { Card, CardContent, Typography, Box, Button, useTheme } from "@mui/material";
import { ArrowUpRight } from "lucide-react";

const QuickActionCard = ({ icon: Icon, title, description, onClick }) => {
  const theme = useTheme();

  return (
    <Card
      elevation={0}
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        border: '1px solid rgba(193, 121, 18, 0.15)',
        backgroundColor: 'white',
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: "0 10px 20px rgba(0,0,0,0.08)",
          transform: "translateY(-4px)",
          borderColor: theme.palette.custom.highlight,
          '& .icon-container': {
            transform: 'scale(1.1)',
            backgroundColor: `rgba(193, 121, 18, 0.2)`,
          },
          '& .action-button': {
            backgroundColor: theme.palette.custom.accent,
            paddingRight: '18px',
            '& .arrow-icon': {
              transform: 'translateX(4px)',
            }
          }
        },
        overflow: "hidden"
      }}
    >
      <CardContent sx={{ p: 0, "&:last-child": { pb: 0 }, height: "100%" }}>
        <Box sx={{ p: 3, display: "flex", flexDirection: "column", height: "100%" }}>
          {/* Icon and title */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Box
              className="icon-container"
              sx={{
                backgroundColor: `rgba(193, 121, 18, 0.1)`,
                width: 50,
                height: 50,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mr: 2,
                transition: "all 0.3s ease",
              }}
            >
              <Icon size={22} color={theme.palette.custom.highlight} />
            </Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                fontSize: "1.1rem",
                color: theme.palette.neutral.main,
                fontFamily: "Raleway",
              }}
            >
              {title}
            </Typography>
          </Box>

          {/* Description */}
          <Typography
            variant="body2"
            sx={{
              mb: 3,
              flexGrow: 1,
              color: theme.palette.text.secondary,
              lineHeight: 1.6
            }}
          >
            {description}
          </Typography>

          {/* Button */}
          <Button
            className="action-button"
            variant="contained"
            onClick={onClick}
            endIcon={<ArrowUpRight size={16} className="arrow-icon" />}
            sx={{
              textTransform: "none",
              fontSize: "0.9rem",
              backgroundColor: theme.palette.custom.highlight,
              color: "white",
              py: 1.5,
              borderRadius: 2,
              fontWeight: 600,
              "&:hover": {
                backgroundColor: theme.palette.custom.accent,
              },
              transition: "all 0.3s ease",
              '& .arrow-icon': {
                transition: "transform 0.3s ease",
              }
            }}
          >
            {title}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default QuickActionCard;