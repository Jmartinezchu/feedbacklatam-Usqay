import Vue from "vue";
import { Pie } from "vue-chartjs/legacy";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale
} from "chart.js";
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)

// ChartJS.register(
//   Title,
//   Tooltip,
//   Legend,
//   PointElement,
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   LineElement,
// );

Vue.component("pie-chart", {
  extends: Pie,
});