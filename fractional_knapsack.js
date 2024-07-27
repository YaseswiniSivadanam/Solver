document.getElementById('generate-table').addEventListener('click', generateTable);

document.getElementById('knapsack-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const weights = Array.from(document.querySelectorAll('input[name="weight"]')).map(input => parseFloat(input.value));
    const values = Array.from(document.querySelectorAll('input[name="profit"]')).map(input => parseFloat(input.value));
    const capacity = parseFloat(document.getElementById('capacity').value);

    const result = fractionalKnapsack(weights, values, capacity);
    document.getElementById('result').innerText = 'Max Profit Value: ' + result.maxValue.toFixed(2) + '\nItems: ' + result.items.map(item => `Item ${item.index + 1} (${item.fraction.toFixed(2)} of it)`).join(', ');
});

function fractionalKnapsack(weights, values, capacity) {
    const n = values.length;
    const items = [];

    for (let i = 0; i < n; i++) {
        items.push({
            index: i,
            weight: weights[i],
            value: values[i],
            ratio: values[i] / weights[i]
        });
    }

    // Sort items by value-to-weight ratio in descending order
    items.sort((a, b) => b.ratio - a.ratio);

    let maxValue = 0;
    let remainingCapacity = capacity;
    const selectedItems = [];

    for (const item of items) {
        if (remainingCapacity > 0 && item.weight <= remainingCapacity) {
            // Take the whole item
            remainingCapacity -= item.weight;
            maxValue += item.value;
            selectedItems.push({ index: item.index, fraction: 1 });
        } else if (remainingCapacity > 0) {
            // Take a fraction of the item
            const fraction = remainingCapacity / item.weight;
            maxValue += item.value * fraction;
            selectedItems.push({ index: item.index, fraction: fraction });
            break;
        }
    }

    return { maxValue: maxValue, items: selectedItems };
}

function generateTable() {
    const itemsCount = parseInt(document.getElementById('items').value);
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = '';

    for (let i = 0; i < itemsCount; i++) {
        const row = document.createElement('tr');

        const weightCell = document.createElement('td');
        const weightInput = document.createElement('input');
        weightInput.type = 'number';
        weightInput.name = 'weight';
        weightInput.placeholder = 'Weight';
        weightCell.appendChild(weightInput);
        row.appendChild(weightCell);

        const profitCell = document.createElement('td');
        const profitInput = document.createElement('input');
        profitInput.type = 'number';
        profitInput.name = 'profit';
        profitInput.placeholder = 'Profit';
        profitCell.appendChild(profitInput);
        row.appendChild(profitCell);

        tableBody.appendChild(row);
    }
}
