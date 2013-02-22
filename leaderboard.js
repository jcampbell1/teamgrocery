// Set up two collections to contain items. On the server,
// it is backed by MongoDB collections named "toBuy" and "purchased".

ToBuy = new Meteor.Collection("toBuy");
Purchased = new Meteor.Collection("purchased");

if (Meteor.isClient) {
  Template.leaderboard.toBuy = function () {
    return ToBuy.find({});
  };
  Template.leaderboard.purchased = function () {
    return Purchased.find({});
  };

  Template.toBuy.events({
    'click': function () {
      Purchased.insert(this);
      ToBuy.remove(this._id);
    }
  });
  Template.purchased.events({
    'click': function () {
      ToBuy.insert(this);
      Purchased.remove(this._id);
    }
  });
  Template.input_form.events({
    'submit': function(e) {
      e.preventDefault();
      
      ToBuy.insert( {
        name: $(e.target).find('#name_input').val(), 
        detail: $(e.target).find('#detail_input').val()
      });

      $(e.target).find('input[type=text]').val('').eq(0).focus();

    }
  });
  
}

// On server startup, create some items if the database is empty.
if (Meteor.isServer) {
  Meteor.startup(function () {
    ToBuy.remove({});
    Purchased.remove({});

    if (ToBuy.find().count() === 0) {
      var names = ["Bread","Milk","Eggs"];
      for (var i = 0; i < names.length; i++)
        ToBuy.insert({name: names[i], detail: ""});
    }
    if (Purchased.find().count() === 0) {
      var names = ["Cheese","Beer","Wine"];
      for (var i = 0; i < names.length; i++)
        Purchased.insert({name: names[i], detail:""});
    }
  });
}
