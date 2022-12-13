import { Box, Card, CardContent, Typography } from '@mui/material';
import React, { FC } from 'react';

interface HighlightCardProps {
  title: string;
  value: string | number;
  imgLink: string;
}

export const HighlightCard: FC<HighlightCardProps> = ({ title, value, imgLink }) => {
  return (
    <Card sx={{ flexGrow: 1, gap: 5 }}>
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography sx={{ fontSize: 16 }} color="text.primary">
              {title}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary">
              Todays {title}
            </Typography>

            <Typography sx={{ fontSize: 16 }}>{value}</Typography>
          </Box>
          <img alt={imgLink} src={imgLink} width={100} height={100} />
        </Box>
      </CardContent>
    </Card>
  );
};
