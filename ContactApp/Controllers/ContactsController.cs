using Microsoft.AspNetCore.Mvc;
using ContactApp.Data;
using ContactApp.Models;
using Microsoft.EntityFrameworkCore;

namespace ContactApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactsController : ControllerBase
    {
        private readonly ContactDbContext _context;
        private readonly ILogger<ContactsController> _logger;

        public ContactsController(ContactDbContext context, ILogger<ContactsController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET: api/contacts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ContactModel>>> GetContacts()
        {
            try
            {
                var contacts = await _context.Contacts.ToListAsync();
                return Ok(contacts);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving contacts");
                return StatusCode(500, new { message = "Error retrieving contacts", error = ex.Message });
            }
        }

        // GET: api/contacts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ContactModel>> GetContact(int id)
        {
            try
            {
                var contact = await _context.Contacts.FindAsync(id);

                if (contact == null)
                {
                    return NotFound(new { message = "Contact not found" });
                }

                return Ok(contact);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving contact");
                return StatusCode(500, new { message = "Error retrieving contact", error = ex.Message });
            }
        }

        // POST: api/contacts
        [HttpPost]
        public async Task<ActionResult<ContactModel>> PostContact(ContactModel contact)
        {
            try
            {
                // Validation
                var validationError = ValidateContact(contact);
                if (validationError != null)
                {
                    return BadRequest(new { message = validationError });
                }

                // Check for duplicate name
                var existingContact = await _context.Contacts
                    .FirstOrDefaultAsync(c => c.Name.ToLower() == contact.Name.ToLower());
                
                if (existingContact != null)
                {
                    return BadRequest(new { message = "A contact with this name already exists" });
                }

                _context.Contacts.Add(contact);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetContact", new { id = contact.ContactID }, contact);
            }
            catch (DbUpdateException ex)
            {
                _logger.LogError(ex, "Error saving contact");
                return StatusCode(500, new { message = "Error saving contact. This name may already exist.", error = ex.Message });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating contact");
                return StatusCode(500, new { message = "Error creating contact", error = ex.Message });
            }
        }

        // PUT: api/contacts/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutContact(int id, ContactModel contact)
        {
            if (id != contact.ContactID)
            {
                return BadRequest(new { message = "ID mismatch" });
            }

            try
            {
                // Validation
                var validationError = ValidateContact(contact);
                if (validationError != null)
                {
                    return BadRequest(new { message = validationError });
                }

                // Check for duplicate name (excluding current contact)
                var existingContact = await _context.Contacts
                    .FirstOrDefaultAsync(c => c.Name.ToLower() == contact.Name.ToLower() && c.ContactID != id);
                
                if (existingContact != null)
                {
                    return BadRequest(new { message = "A contact with this name already exists" });
                }

                _context.Entry(contact).State = EntityState.Modified;
                await _context.SaveChangesAsync();

                return Ok(contact);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ContactExists(id))
                {
                    return NotFound(new { message = "Contact not found" });
                }
                throw;
            }
            catch (DbUpdateException ex)
            {
                _logger.LogError(ex, "Error updating contact");
                return StatusCode(500, new { message = "Error updating contact. This name may already exist.", error = ex.Message });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating contact");
                return StatusCode(500, new { message = "Error updating contact", error = ex.Message });
            }
        }

        // DELETE: api/contacts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContact(int id)
        {
            try
            {
                var contact = await _context.Contacts.FindAsync(id);
                if (contact == null)
                {
                    return NotFound(new { message = "Contact not found" });
                }

                _context.Contacts.Remove(contact);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Contact deleted successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting contact");
                return StatusCode(500, new { message = "Error deleting contact", error = ex.Message });
            }
        }

        private bool ContactExists(int id)
        {
            return _context.Contacts.Any(e => e.ContactID == id);
        }

        private string? ValidateContact(ContactModel contact)
        {
            if (string.IsNullOrWhiteSpace(contact.Name))
            {
                return "Name field cannot be empty";
            }

            if (string.IsNullOrWhiteSpace(contact.Mobile))
            {
                return "Mobile field cannot be empty";
            }

            if (string.IsNullOrWhiteSpace(contact.Country))
            {
                return "Country field cannot be empty";
            }

            return null;
        }
    }
}
