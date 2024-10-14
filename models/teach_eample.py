from odoo import models, fields

class TeachExample(models.Model):
    _name = 'teach_example'
    _description = 'Teach Example for odoo'
    _inherit = 'teach'

    teach_example = fields.Char(string='Name Teach example')

