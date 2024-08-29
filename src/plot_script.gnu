# Set the output file type and name
set terminal pngcairo enhanced
set output 'line_chart.png'

# Set the title and labels
set title "Simple Line Chart"
set xlabel "X-axis"
set ylabel "Y-axis"

# Plot the data
plot "data.txt" using 1:2 with lines title "Data Line"
