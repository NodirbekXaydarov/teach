from odoo import models, fields

class Teach(models.Model):
    _name = 'teach'
    _description = 'Teach for odoo'

    name_teach = fields.Char(string='Name Char')
    subtitle = fields.Char(string='Short Description')
