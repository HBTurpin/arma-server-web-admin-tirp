var $ = require('jquery')
var Backbone = require('backbone')

module.exports = Backbone.Model.extend({
  defaults: {
    game_selected: "",
    title: '',
    uid: '',
    port: 2302,
    password: '',
    admin_password: '',
    allowed_file_patching: 1,
    auto_start: false,
    virtual_server: true,
    battle_eye: false,
    file_patching: false,
    forcedDifficulty: '',
    max_players: null,
    mods: [],
    mods_optional: [],
    mods_server_only: [],
    motd: '',
    number_of_headless_clients: 0,
    parameters: [],
    persistent: false,
    processes: null,
    state: null,
    von: false,
    verify_signatures: false,
    additionalConfigurationOptions: '',
    cbaConfigurationOptions: ''
  },
  urlRoot: '/api/servers/',
  start: function (cb) {
    var self = this
    $.ajax({
      url: '/api/servers/' + self.get('id') + '/start',
      type: 'POST',
      success: function (resp) {
        self.set('pid', resp.pid)
        if (cb) {
          cb()
        }
      },
      error: function (err) {
        if (cb) {
          cb(err)
        }
      }
    })
  },

  headlessrefresh: function (cb) {
    var self = this
    $.ajax({
      url: '/api/servers/' + self.get('id') + '/headlessrefresh',
      type: 'POST',
      success: function (resp) {
        self.set('pid', resp.pid)
        if (cb) {
          cb()
        }
      },
      error: function (err) {
        if (cb) {
          cb(err)
        }
      }
    })
  },

  stop: function (cb) {
    var self = this
    $.ajax({
      url: '/api/servers/' + self.get('id') + '/stop',
      type: 'POST',
      success: function (resp) {
        self.set('pid', resp.pid)
        if (cb) {
          cb()
        }
      },
      error: function (err) {
        if (cb) {
          cb(err)
        }
      }
    })
  },

  delete: function (cb) {
    var self = this
    $.ajax({
      url: '/api/servers/' + self.get('id') + '/delete',
      type: 'POST',
      success: function (resp) { 
        self.set('pid', resp.pid)
        if (cb) {
          cb()
        }
      },
      error: function (err) {
        if (cb) {
          cb(err)
        }
      }
    })
  },

  missionDifficulty: function () {
    var serverDifficulty = this.get('forcedDifficulty')
    if (serverDifficulty) {
      return serverDifficulty.toLowerCase()
    }

    return undefined
  }
})
