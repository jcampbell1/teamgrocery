// Set up a collection to contain player information. On the server,
// it is backed by a MongoDB collection named "players".

ToBuy = new Meteor.Collection("toBuy");
Purchased = new Meteor.Collection("purchased");

if (Meteor.isClient) {
  Template.leaderboard.toBuy = function () {
    return ToBuy.find({});
  };
  Template.leaderboard.purchased = function () {
    return Purchased.find({});
  };


  // Template.leaderboard.events({
  //   'click input.inc': function () {
  //     ToBuy.update(Session.get("selected_player"));
  //   }
  // });
  Template.toBuy.events({
    'click': function () {
      var blah = this;
      ToBuy.remove(this._id);
      Purchased.insert(blah);
    }
  });
  Template.purchased.events({
    'click': function () {
      var blah = this;
      ToBuy.insert(this);
      Purchased.remove(this._id);

    }
  });
  Template.input.events({
    'submit': function(e) {
      e.preventDefault();
      
      ToBuy.insert( {
        name: $(e.target).find('#name_input').val(), 
        detail: $(e.target).find('#detail_input').val()
      } ) ;
      $(e.target).find('#name_input').focus().val('');
      detail: $(e.target).find('#detail_input').val('');
      console.log(this);
      return false;
    }
  })
  
}

// On server startup, create some players if the database is empty.
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
