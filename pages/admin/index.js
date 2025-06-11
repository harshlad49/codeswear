import React from 'react';
import { Grid } from "@mui/material";

// Correct file paths & spellings
import BlogCard from "../src/components/dashboard/BlogCard";
import SalesOverview from "../src/components/dashboard/SalesOverview";
import DailyActivity from "../src/components/dashboard/DailyActivity";
import ProductPerformance from "../src/components/dashboard/ProductPerformance";

export default function Home() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={12}>
        <SalesOverview />
      </Grid>

      <Grid item xs={12} lg={4}>
        <DailyActivity />
      </Grid>

      <Grid item xs={12} lg={8}>
        <ProductPerformance />
      </Grid>

      <Grid item xs={12} lg={12}>
        <BlogCard />
      </Grid>
    </Grid>
  );
}
