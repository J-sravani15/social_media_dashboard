// Chart.js configuration and initialization
document.addEventListener('DOMContentLoaded', function () {
  // Chart.js default configuration for dark theme
  Chart.defaults.color = '#94a3b8';
  Chart.defaults.borderColor = '#2d2d5f';
  Chart.defaults.backgroundColor = 'rgba(102, 126, 234, 0.1)';

  // Bar Chart - Monthly Engagement
  const barCtx = document.getElementById('barChart');
  if (barCtx) {
    new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Instagram',
            data: [12000, 15000, 18000, 14000, 22000, 25000],
            backgroundColor: 'rgba(228, 64, 95, 0.8)',
            borderColor: '#e4405f',
            borderWidth: 2,
            borderRadius: 8,
            borderSkipped: false,
          },
          {
            label: 'Facebook',
            data: [8000, 12000, 15000, 11000, 18000, 20000],
            backgroundColor: 'rgba(24, 119, 242, 0.8)',
            borderColor: '#1877f2',
            borderWidth: 2,
            borderRadius: 8,
            borderSkipped: false,
          },
          {
            label: 'Twitter',
            data: [6000, 9000, 12000, 8000, 15000, 17000],
            backgroundColor: 'rgba(29, 161, 242, 0.8)',
            borderColor: '#1da1f2',
            borderWidth: 2,
            borderRadius: 8,
            borderSkipped: false,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 2,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              usePointStyle: true,
              padding: 20,
              font: {
                size: 12,
                weight: '500'
              }
            }
          },
          tooltip: {
            backgroundColor: 'rgba(15, 15, 35, 0.95)',
            titleColor: '#ffffff',
            bodyColor: '#e2e8f0',
            borderColor: '#2d2d5f',
            borderWidth: 1,
            cornerRadius: 8,
            displayColors: true,
            callbacks: {
              label: function (context) {
                return context.dataset.label + ': ' + context.parsed.y.toLocaleString();
              }
            }
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            },
            ticks: {
              color: '#94a3b8',
              font: {
                size: 11
              }
            }
          },
          y: {
            grid: {
              color: 'rgba(45, 45, 95, 0.5)',
              drawBorder: false
            },
            ticks: {
              color: '#94a3b8',
              font: {
                size: 11
              },
              callback: function (value) {
                return value >= 1000 ? (value / 1000) + 'K' : value;
              }
            }
          }
        },
        interaction: {
          intersect: false,
          mode: 'index'
        }
      }
    });
  }

  // Doughnut Chart - Traffic Sources
  const doughnutCtx = document.getElementById('doughnutChart');
  if (doughnutCtx) {
    new Chart(doughnutCtx, {
      type: 'doughnut',
      data: {
        labels: ['Direct', 'Social Media', 'Email', 'Referral', 'Search'],
        datasets: [{
          data: [35, 25, 20, 12, 8],
          backgroundColor: [
            '#667eea',
            '#e4405f',
            '#1877f2',
            '#1da1f2',
            '#22c55e'
          ],
          borderColor: '#1e1e3f',
          borderWidth: 3,
          hoverBorderWidth: 4,
          hoverOffset: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 1,
        cutout: '65%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              usePointStyle: true,
              padding: 15,
              font: {
                size: 11,
                weight: '500'
              }
            }
          },
          tooltip: {
            backgroundColor: 'rgba(15, 15, 35, 0.95)',
            titleColor: '#ffffff',
            bodyColor: '#e2e8f0',
            borderColor: '#2d2d5f',
            borderWidth: 1,
            cornerRadius: 8,
            callbacks: {
              label: function (context) {
                return context.label + ': ' + context.parsed + '%';
              }
            }
          }
        },
        animation: {
          animateRotate: true,
          animateScale: true,
          duration: 1000
        }
      }
    });
  }

  // Pie Chart - Platform Performance
  const pieCtx = document.getElementById('pieChart');
  if (pieCtx) {
    new Chart(pieCtx, {
      type: 'pie',
      data: {
        labels: ['Instagram', 'Facebook', 'Twitter'],
        datasets: [{
          data: [45, 35, 20],
          backgroundColor: [
            '#e4405f',
            '#1877f2',
            '#1da1f2'
          ],
          borderColor: '#1e1e3f',
          borderWidth: 3,
          hoverBorderWidth: 4,
          hoverOffset: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 1,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              usePointStyle: true,
              padding: 15,
              font: {
                size: 11,
                weight: '500'
              }
            }
          },
          tooltip: {
            backgroundColor: 'rgba(15, 15, 35, 0.95)',
            titleColor: '#ffffff',
            bodyColor: '#e2e8f0',
            borderColor: '#2d2d5f',
            borderWidth: 1,
            cornerRadius: 8,
            callbacks: {
              label: function (context) {
                return context.label + ': ' + context.parsed + '%';
              }
            }
          }
        },
        animation: {
          animateRotate: true,
          animateScale: true,
          duration: 1000
        }
      }
    });
  }
});