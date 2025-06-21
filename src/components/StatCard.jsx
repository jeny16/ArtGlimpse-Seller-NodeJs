import React from "react";
import { Card, CardContent, Typography, Box, LinearProgress, useTheme } from "@mui/material";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const StatCard = ({ icon: Icon, title, value, change, color, subtext }) => {
  const theme = useTheme();

  // Parse the color string to get the actual color from theme
  const getThemeColor = (colorPath) => {
    const parts = colorPath.split('.');
    let result = theme.palette;

    for (const part of parts) {
      if (result[part]) {
        result = result[part];
      } else {
        return colorPath;
      }
    }

    return typeof result === 'string' ? result : colorPath;
  };

  const iconColor = getThemeColor(color);
  const isPositive = change >= 0;

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
        border: '1px solid rgba(193, 121, 18, 0.1)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.05)',
        overflow: 'hidden',
        background: 'linear-gradient(145deg, white 0%, #fdf9f1 100%)',
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: '0 12px 28px rgba(0,0,0,0.08)',
        },
      }}
    >
      <CardContent sx={{ p: 3, display: "flex", flexDirection: "column" }}>
        <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", mb: 2 }}>
          <Box>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5 }}>
              {title}
            </Typography>
            <Typography variant="h4" fontWeight="bold" sx={{ color: theme.palette.neutral.main }}>
              {value}
            </Typography>
            {subtext && (
              <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.5 }}>
                {subtext}
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              backgroundColor: `rgba(193, 121, 18, 0.1)`,
              p: 1.5,
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon size={24} color={iconColor} />
          </Box>
        </Box>

        <Box sx={{ mt: "auto" }}>
          <LinearProgress
            variant="determinate"
            value={Math.min(100, Math.abs(change) * 5)}
            sx={{
              height: 6,
              borderRadius: 3,
              backgroundColor: 'rgba(0, 0, 0, 0.05)',
              '& .MuiLinearProgress-bar': {
                borderRadius: 3,
                background: isPositive
                  ? `linear-gradient(90deg, ${theme.palette.custom.accent}, ${theme.palette.custom.highlight})`
                  : `linear-gradient(90deg, #d32f2f, #f44336)`
              }
            }}
          />
          <Box sx={{ display: "flex", alignItems: "center", mt: 1.5 }}>
            {isPositive ? (
              <ArrowUpRight
                size={18}
                color={theme.palette.custom.highlight}
                style={{ marginRight: 4 }}
              />
            ) : (
              <ArrowDownRight
                size={18}
                color={theme.palette.error.main}
                style={{ marginRight: 4 }}
              />
            )}
            <Typography
              variant="body2"
              color={isPositive ? "custom.highlight" : "error.main"}
              sx={{ fontWeight: 600 }}
            >
              {isPositive ? "+" : ""}{change}% from last week
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatCard;