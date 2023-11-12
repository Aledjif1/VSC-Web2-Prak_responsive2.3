document.addEventListener("DOMContentLoaded", function() {
    // Variablen erstellen
    const searchButton = document.querySelector(".search-button");
    const orderButton = document.querySelector(".order-button");
    const addToCartButtons = document.querySelectorAll(".add-to-cart-button");
    
    const cartIcon = document.querySelector(".cart");
    const cartCount = document.querySelector(".cart-count");
    

/* Warenkorb button */
    // Funktion zum Weiterleiten zur Warenkorbseite
    function navigateToCartPage() {
        window.location.href = "warenkorb.html";
    }
    // Füge Event-Listener zum Warenkorb-Symbol hinzu
    if (cartIcon) {
        cartIcon.addEventListener("click", navigateToCartPage);
    }

/* Zähler für Warenkorb */
    // Zähler für den Warenkorb auf 0 setzen
    let itemCount = 0;
    // Funktion zum Erhöhen des Zählers und Aktualisieren des Warenkorbs
    function increaseCartCount() {
        itemCount++;
        cartCount.textContent = itemCount;
    }
    // Füge Event-Listener zu den Buttons mit der Klasse "add-to-cart-button" hinzu
    addToCartButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            increaseCartCount();
        });
    });

    // Warenkorb weiterleitung zu Bestellung
    function navigateToOrderPage() {
        window.location.href = "zusammenfassung.html";
    }
    // Füge Event-Listener zum Order-Button hinzu
    if (orderButton) {
        orderButton.addEventListener("click", navigateToOrderPage);
    }

/* Suche */
    // Funktion zum Abrufen des Suchbegriffs aus der URL
    function getSearchTermFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get("q");
    }
    // Funktion zur Anzeige des Suchbegriffs im Suchfeld
    function displaySearchTermInInput() {
        const searchInput = document.getElementById("Suchbegriff");
        const searchTerm = getSearchTermFromURL();
        // Überprüfe, ob ein Suchbegriff vorhanden ist, und füge ihn als Platzhalter in das Suchfeld ein
        if (searchTerm) {
            searchInput.placeholder = searchTerm;
        }
    }
    // Funktion zum Suchen von Suchergebnissen 
    function search() {
        const searchTerm = document.getElementById("Suchbegriff").value;
        if (searchTerm) {
            // Hier leite ich auf die Seite Suche_Ergebnis.html mit dem Suchbegriff in der URL weiter
            window.location.href = "suche_Ergebnis.html?q=" + searchTerm;
        }
    }

    // Füge Event-Listener zum Suchen-Button hinzu
    if (searchButton) {
        searchButton.addEventListener("click", () => {
            search();
        });
    }

    // Suchbegriff aus URL einsetzen
    displaySearchTermInInput();

});
