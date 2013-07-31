// Gestió de favorits
// moga 2013


  // Un mercat seleccionat com a favorit, (id del mercat)
  var Favorit = Backbone.Model.extend({
  
    // Default attributes for the todo item.
    defaults: function() {
      return {
        id: 0,
		order: Favorits.nextOrder()
      };
    },

    // Initialitza
    initialize: function() {
    }
	
  });

  
  // Llista de Favorits
  // ---------------------

  // Col·lecció de registres emprant *localStorage*
  var FavoritsList = Backbone.Collection.extend({

    // Refer�ncia del Model a la llista
    model: Favorit,

    // Base de dades
    localStorage: new Backbone.LocalStorage("favorits-infoFires"),

    // Total Favorits a la llista
    totalRegistres: function() {
	  return this.length;
    },

    nextOrder: function() {
      if (!this.length) return 1;
      return this.last().get('order') + 1;
    },

    // Els registres s'ordenen en l'ordre en que s'han guardat
    comparator: function(favorit) {
      return favorit.get('order');
    }

  });

  // Es crea la llista de Favorits.
  var Favorits = new FavoritsList;
