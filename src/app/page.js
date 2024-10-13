"use client";
import React, { useState, useEffect } from 'react';
import { Button, Grid, Card, CardContent, Typography, Box, Avatar } from '@mui/material';
import { Trophy, Award, Medal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LeaderCard = ({ rank, name, score, className, AwardIcon, height, iconHeight }) => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 1 }}
    key={rank}
  >
    <Card className={`${className} relative`} sx={{ overflow: 'visible', borderRadius: '10px', boxShadow: 3, height: height, borderBottomLeftRadius: 'unset', borderBottomRightRadius: 'unset', boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px' }}>
      <CardContent sx={{ textAlign: 'center', position: 'relative' }}>
        <Typography variant="h5" fontWeight="bold" mb={2}>
          {rank}. Sıra
        </Typography>
        <Typography variant="h6" color="textSecondary" mb={2}>
          {name}
        </Typography>
        <Typography variant="h4" fontWeight="bold">
          {score} puan
        </Typography>
        <Box
          sx={{
            position: 'absolute',
            bottom: +iconHeight,
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#FFD700',
            borderRadius: '50%',
            padding: 1,
            boxShadow: 3,
            border: '8px solid white',
            zIndex: 100
          }}
        >
          <Avatar sx={{ backgroundColor: 'transparent' }}>
            <AwardIcon size={40} color="white" />
          </Avatar>
        </Box>
      </CardContent>
    </Card>
    <div style={{
      width: 0,
      height: 0,
      borderLeft: '185px solid transparent',
      borderRight: '185px solid transparent',
      borderTop: '80px solid white',
      filter: 'drop-shadow(1px 7px 2px rgba(0, 0, 0, 0.3))',
      zIndex: -1
    }} />
  </motion.div>
);

const LeaderListItem = ({ rank, name, score }) => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.5 }}
  >
    <Card sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2, padding: 2, boxShadow: 3 }}>
      <Typography variant="body1" fontWeight="bold">
        {rank}.
      </Typography>
      <Typography variant="body1" color="textSecondary">
        {name}
      </Typography>
      <Typography variant="body1" fontWeight="bold">
        {score} puan
      </Typography>
    </Card>
  </motion.div>
);

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([
    { id: 1, name: 'Ali', score: 120 },
    { id: 2, name: 'Fatma', score: 101 },
    { id: 3, name: 'Ayşe', score: 100 },
    { id: 4, name: 'Mehmet', score: 90 },
    { id: 5, name: 'Ahmet', score: 85 },
    { id: 6, name: 'Mustafa', score: 83 },
    { id: 7, name: 'Zeynep', score: 82 },
    { id: 8, name: 'Elif', score: 77 },
    { id: 9, name: 'Hasan', score: 68 },
    { id: 10, name: 'Selin', score: 65 },
  ]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setLeaders(prevLeaders => {
        const newLeaders = [...prevLeaders];
        const randomIndex = Math.floor(Math.random() * newLeaders.length);
        newLeaders[randomIndex].score += Math.floor(Math.random() * 10);
        return newLeaders.sort((a, b) => b.score - a.score);
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ padding: 6, backgroundColor: 'grey.100', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Başlık */}
      <Typography variant="h3" fontWeight="bold" mb={6} textAlign="center" color="text.primary">
        Liderlik Tablosu
      </Typography>
      {!showResults && (
        <Button 
          variant="contained" 
          onClick={() => setShowResults(true)} 
          sx={{ marginBottom: 4 }}
        >
          Sonuçları Göster
        </Button>
      )}
      {showResults && (
        <AnimatePresence>
          <Grid container spacing={4} mb={5} sx={{ width: '100%', maxWidth: 'lg', marginBottom: '3rem' }}>
            <Grid item xs={12} sm={4}>
              <LeaderCard
                rank={2}
                name={leaders[1].name}
                score={leaders[1].score}
                AwardIcon={Award}
                className="h-64"
                height='240px'
                iconHeight='-170'
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <LeaderCard
                rank={1}
                name={leaders[0].name}
                score={leaders[0].score}
                AwardIcon={Trophy}
                className="h-80"
                height='320px'
                iconHeight='-250'
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <LeaderCard
                rank={3}
                name={leaders[2].name}
                score={leaders[2].score}
                AwardIcon={Medal}
                className="h-56"
                height='220px'
                iconHeight='-150'
              />
            </Grid>
          </Grid>
          {/* Diğer liderler listesi */}
          <Box sx={{ width: '100%', maxWidth: 'md' }}>
            {leaders.slice(3).map((leader, index) => (
              <LeaderListItem
                key={leader.id}
                rank={index + 4}
                name={leader.name}
                score={leader.score}
              />
            ))}
          </Box>
        </AnimatePresence>
      )}
    </Box>
  );
};

export default Leaderboard;
