document.addEventListener('DOMContentLoaded', () => {
    const getMoneyButton = document.getElementById('GetMoneyButton');
    const countdown = document.getElementById('timer');
    const moneyAmount = document.getElementById('money');
    const shopButton = document.getElementById('ShopButton');
    const shopContent = document.getElementById('ShopContent');
    const buyCarButton = document.getElementById('BuyCarButton');
    const buyAkazaCarButton = document.getElementById('BuyAkazaCarButton');
    const closeShopButton = document.getElementById('CloseButton');
    const carCost = document.getElementById('CarCost');
    const inventoryButton = document.getElementById('InventoryButton');
  
    // Load saved data from localStorage
    let currentMoney = parseInt(localStorage.getItem('currentMoney')) || 0;
    let carsInventory = JSON.parse(localStorage.getItem('carsInventory')) || {};
  
    updateUI();
  
    let isCountdownActive = false;
  
    getMoneyButton.addEventListener('click', () => {
      if (!isCountdownActive) {
        const money = Math.floor(Math.random() * 1000) + 1;
        currentMoney += money;
        moneyAmount.textContent = currentMoney;
  
        isCountdownActive = true;
        getMoneyButton.disabled = true;
  
        let remainingTime = 60;
        countdown.textContent = `Countdown: ${remainingTime}s`;
  
        const timer = setInterval(() => {
          remainingTime--;
          countdown.textContent = `Countdown: ${remainingTime}s`;
  
          if (remainingTime <= 0) {
            clearInterval(timer);
            isCountdownActive = false;
            getMoneyButton.disabled = false;
          }
        }, 1000);
      }
    });
  
    shopButton.addEventListener('click', () => {
      shopContent.style.display = 'block';
    });
  
    buyCarButton.addEventListener('click', () => {
      const cost = 105;
      if (currentMoney >= cost) {
        currentMoney -= cost;
  
        if (!carsInventory['Green Car']) {
          carsInventory['Green Car'] = 1;
        } else {
          carsInventory['Green Car']++;
        }
  
        updateInventoryDisplay();
        updateUI();
      } else {
        carCost.textContent = 'Not enough money!';
        carCost.style.color = 'red';
      }
    });
  
    buyAkazaCarButton.addEventListener('click', () => {
      const cost = 50;
      if (currentMoney >= cost) {
        currentMoney -= cost;
  
        if (!carsInventory['Akaza Car']) {
          carsInventory['Akaza Car'] = 1;
        } else {
          carsInventory['Akaza Car']++;
        }
  
        updateInventoryDisplay();
        updateUI();
      } else {
        carCost.textContent = 'Not enough money!';
        carCost.style.color = 'red';
      }
    });
  
    inventoryButton.addEventListener('click', () => {
      displayInventory();
    });
  
    closeShopButton.addEventListener('click', () => {
      shopContent.style.display = 'none';
    });
  
    function updateInventoryDisplay() {
      inventoryButton.textContent = `Inventory (${getCarsInventoryText()})`;
    }
  
    function getCarsInventoryText() {
      let inventoryText = '';
      for (const car in carsInventory) {
        if (inventoryText !== '') {
          inventoryText += ', ';
        }
        inventoryText += `${car}: ${carsInventory[car]}`;
      }
      return inventoryText;
    }
  
    function displayInventory() {
      const inventoryText = getCarsInventoryText();
      if (inventoryText === '') {
        alert('Your inventory is empty.');
      } else {
        alert(`Your inventory: ${inventoryText}`);
      }
    }
  
    // Update UI elements based on saved data
    function updateUI() {
      moneyAmount.textContent = currentMoney;
      updateInventoryDisplay();
      localStorage.setItem('currentMoney', currentMoney);
      localStorage.setItem('carsInventory', JSON.stringify(carsInventory));
    }
  });
  