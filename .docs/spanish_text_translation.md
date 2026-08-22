````markdown
# Spanish Text Translation — MeetOps

> **Purpose:** Complete Spanish UI translation dictionary for MeetOps.
>
> **Language:** Spanish (`es`)
>
> **Important implementation rules:**
> - Use these translations for static UI text only.
> - Do NOT translate dynamic/database values such as room names, user names, emails, booking purposes, dates, times, numbers, resource descriptions, or other user-generated content.
> - Keep technical values, IDs, route names, enum values, and API/database values unchanged.
> - Toast notifications must also use the Spanish translations below.
> - Prefer natural, professional Spanish suitable for a business/office meeting-room management application.
> - Do not use machine-translated or literal wording when the translation below already provides the intended Spanish phrasing.

---

# 1. Language

| English | Spanish |
|---|---|
| English | Inglés |
| Bengali | Bengalí |
| Hindi | Hindi |
| Chinese | Chino |
| Japanese | Japonés |
| Tamil | Tamil |
| Spanish | Español |
| Language | Idioma |
| Language changed to Spanish | Idioma cambiado a español |

---

# 2. Brand / Header

| English | Spanish |
|---|---|
| MeetOps | MeetOps |
| Admin | Administrador |
| Administrator | Administración |
| Manager | Gerente |
| User | Usuario |
| Logout | Cerrar sesión |
| Login | Iniciar sesión |
| Notifications | Notificaciones |
| Mark all as read | Marcar todo como leído |

---

# 3. Sidebar / Navigation

| English | Spanish |
|---|---|
| Dashboard | Panel |
| Bookings | Reservas |
| Calendar | Calendario |
| Resources | Recursos |
| Users | Usuarios |

---

# 4. Dashboard

| English | Spanish |
|---|---|
| Dashboard | Panel |
| Welcome back, | Bienvenido de nuevo, |
| Total Bookings | Reservas totales |
| Pending | Pendiente |
| Approved | Aprobado |
| Rejected | Rechazado |
| Upcoming Bookings | Próximas reservas |
| No upcoming bookings | No hay reservas próximas |
| Quick Actions | Acciones rápidas |
| New Booking | Nueva reserva |
| View All Bookings | Ver todas las reservas |
| Manage Resources | Gestionar recursos |
| AI Insights | Información sobre IA |
| AI Assistant | Asistente de IA |
| Chat with AI assistant | Chatea con el asistente de IA |
| MeetOps AI Assistant | Asistente de IA de MeetOps |
| Type your message... | Escribe tu mensaje... |
| Send | Enviar |

---

# 5. Dashboard AI Assistant

| English | Spanish |
|---|---|
| AI Assistant | Asistente de IA |
| MeetOps AI Assistant | Asistente de IA de MeetOps |
| Hello! I'm MeetOps AI. I can help you reserve rooms, check availability, and manage your bookings. | ¡Hola! Soy MeetOps AI. Puedo ayudarte a reservar salas, consultar la disponibilidad y gestionar tus reservas. |
| Try saying: "Book a room for 5 people tomorrow at 2 PM." | Prueba diciendo: «Reserva una sala para 5 personas mañana a las 14:00». |
| Chat with AI Assistant | Chatea con el asistente de IA |

---

# 6. Notifications

| English | Spanish |
|---|---|
| Notifications | Notificaciones |
| Mark all as read | Marcar todo como leído |
| New multi-day booking request for 4 days | Nueva solicitud de reserva de varios días por 4 días |
| New multi-day booking request for 5 days | Nueva solicitud de reserva de varios días por 5 días |
| New multi-day booking request for 16 days | Nueva solicitud de reserva de varios días por 16 días |
| Your booking for Room 10 has been approved | Tu reserva de Room 10 ha sido aprobada |
| No notifications | No hay notificaciones |

> **Dynamic notification rule:** Preserve dynamic room names, user names, dates, and numbers. Only translate the static sentence structure.

---

# 7. Bookings Page

| English | Spanish |
|---|---|
| Bookings | Reservas |
| Status | Estado |
| All Statuses | Todos los estados |
| User | Usuario |
| All Users | Todos los usuarios |
| Search | Buscar |
| Search by resource, purpose or user... | Buscar por recurso, propósito o usuario... |
| Export PDF | Exportar PDF |
| New Booking | Nueva reserva |
| Active Bookings | Reservas activas |
| Previous Bookings | Reservas anteriores |
| Resource | Recurso |
| User | Usuario |
| Purpose | Objetivo |
| Date | Fecha |
| Start Time | Hora de inicio |
| End Time | Fin de los tiempos |
| Type | Tipo |
| Status | Estado |
| Actions | Acciones |
| View | Vista |
| View Details | Ver detalles |
| No active bookings found | No se encontraron reservas activas |
| No previous bookings found | No se encontraron reservas anteriores |
| Multi-day | Varios días |
| Single Day | Día único |
| Several Days | Varios días |

---

# 8. Booking Statuses

| English | Spanish |
|---|---|
| All Statuses | Todos los estados |
| Pending | Pendiente |
| Approved | Aprobado |
| Rejected | Rechazado |
| Cancelled | Cancelado |
| Completed | Terminado |
| Completed | Completado |

> Prefer **"Terminado"** when matching the wording shown in the booking status filter screenshot.

---

# 9. Booking Table Actions

| English | Spanish |
|---|---|
| View | Vista |
| View Details | Ver detalles |
| Details | Detalles |
| Previous | Anterior |
| Next | Próximo |
| Page | Página |
| of | de |

---

# 10. Calendar

| English | Spanish |
|---|---|
| Calendar | Calendario |
| View all resource bookings | Ver todas las reservas de recursos |
| Today | Hoy |
| Previous | Atrás |
| Next | Próximo |
| Month | Mes |
| Week | Semana |
| Day | Día |
| Agenda | Orden del día |
| Legend | Leyenda |
| Approved | Aprobado |
| Pending | Pendiente |
| Rejected | Rechazado |
| Cancelled | Cancelado |

### Weekdays

| English | Spanish |
|---|---|
| Sunday | DOM |
| Monday | LUN |
| Tuesday | MAR |
| Wednesday | MIÉ |
| Thursday | JUE |
| Friday | VIE |
| Saturday | SÁB |

### Calendar booking labels

| English | Spanish |
|---|---|
| ROOM | SALA |
| ADMIN | ADMINISTRADOR |

> Dynamic room/user names remain unchanged. Example: `ROOM 10 - ADMIN` may use the existing project's dynamic formatting while static labels are translated.

---

# 11. New Booking

| English | Spanish |
|---|---|
| New Booking | Nueva reserva |
| Create a new resource booking | Crear una nueva reserva de recursos |
| Step 1: Select Resource | Paso 1: Seleccionar recurso |
| Select the resource you want to book | Elige el recurso que deseas reservar |
| Step 2: Select Date and Time | Paso 2: Seleccionar fecha y hora |
| Choose when you want to book | Elige cuándo quieres reservar |
| Step 3: Booking Details | Paso 3: Detalles de la reserva |
| Provide additional information about your booking | Proporcione información adicional sobre su reserva |
| Next | Próximo |
| Back | Atrás |
| Create Booking | Crear reserva |
| Create Booking | Crear reserva |

---

# 12. New Booking — Step 1

| English | Spanish |
|---|---|
| Step 1: Select Resource | Paso 1: Seleccionar recurso |
| Select the resource you want to book | Elige el recurso que deseas reservar |
| Capacity | Capacidad |
| Next | Próximo |

> Resource names, locations, capacities, and descriptions are dynamic values and must remain unchanged.

---

# 13. New Booking — Step 2

| English | Spanish |
|---|---|
| Step 2: Select Date and Time | Paso 2: Seleccionar fecha y hora |
| Choose when you want to book | Elige cuándo quieres reservar |
| Booking Type | Tipo de reserva |
| Single Day | Día único |
| Multiple Days | Varios días |
| Start Date | Fecha de inicio |
| End Date | Fecha de finalización |
| Total Days | Días totales |
| Start Time | Hora de inicio |
| End Time | Fin de los tiempos |
| Time Available | Horario disponible |
| Available Time Slot | Horario disponible |
| Next | Próximo |
| Back | Atrás |

---

# 14. New Booking — Step 3

| English | Spanish |
|---|---|
| Step 3: Booking Details | Paso 3: Detalles de la reserva |
| Provide additional information about your booking | Proporcione información adicional sobre su reserva |
| Purpose | Objetivo |
| Attendees (Optional) | Asistentes (opcional) |
| Enter attendee names separated by commas. | Introduzca los nombres de los asistentes separados por comas. |
| Example: Team Meeting, Client Presentation | Por ejemplo: Reunión de equipo, Presentación al cliente |
| Generate Agenda with AI | Generar agenda con IA |
| Booking Summary | Resumen de la reserva |
| Resource | Recurso |
| Location | Ubicación |
| Booking Type | Tipo de reserva |
| Start Date | Fecha de inicio |
| End Date | Fecha de finalización |
| Total Days | Días totales |
| Time | Hora |
| Create Booking | Crear reserva |
| Back | Atrás |

---

# 15. Booking Summary

| English | Spanish |
|---|---|
| Booking Summary | Resumen de la reserva |
| Resource | Recurso |
| Location | Ubicación |
| Booking Type | Tipo de reserva |
| Start Date | Fecha de inicio |
| End Date | Fecha de finalización |
| Total Days | Días totales |
| Time | Hora |

---

# 16. Export Bookings to PDF

| English | Spanish |
|---|---|
| Export Bookings to PDF | Exportar reservas a PDF |
| Export bookings history | Exportar historial de reservas |
| Select filters to export booking history. | Seleccione los filtros para exportar el historial de reservas. |
| Export PDF | Exportar PDF |
| Start Date | Fecha de inicio |
| End Date | Fecha de finalización |
| Cancel | Cancelar |

---

# 17. Resources

| English | Spanish |
|---|---|
| Resources | Recursos |
| Add Resource | Agregar recurso |
| Add New Resource | Agregar nuevo recurso |
| Create a new resource for bookings | Crear un nuevo recurso para reservas |
| Edit Resource | Editar recurso |
| Update resource information | Actualizar la información de los recursos |
| Delete Resource | Eliminar recurso |
| Name | Nombre |
| Description | Descripción |
| Location | Ubicación |
| Capacity | Capacidad |
| Actions | Acciones |
| Create | Crear |
| Update | Actualizar |
| Delete | Borrar |
| Cancel | Cancelar |

---

# 18. Add Resource Modal

| English | Spanish |
|---|---|
| Add New Resource | Agregar nuevo recurso |
| Create a new resource for bookings | Crear un nuevo recurso para reservas |
| Name | Nombre |
| Description | Descripción |
| Location | Ubicación |
| Capacity | Capacidad |
| Enter resource name | Introduzca el nombre del recurso |
| Enter a description | Introduzca una descripción |
| Enter location | Introduzca la ubicación |
| Create | Crear |
| Cancel | Cancelar |

---

# 19. Edit Resource Modal

| English | Spanish |
|---|---|
| Edit Resource | Editar recurso |
| Update resource information | Actualizar la información de los recursos |
| Name | Nombre |
| Description | Descripción |
| Location | Ubicación |
| Capacity | Capacidad |
| Update | Actualizar |
| Cancel | Cancelar |

---

# 20. Delete Resource Confirmation

| English | Spanish |
|---|---|
| Delete Resource | Eliminar recurso |
| Are you sure you want to delete "{resource}"? This action cannot be undone. | ¿Seguro que quieres eliminar "{resource}"? Esta acción no se puede deshacer. |
| Cancel | Cancelar |
| Delete | Borrar |

> `{resource}` is dynamic and must remain unchanged.

---

# 21. Users

| English | Spanish |
|---|---|
| Users | Usuarios |
| Search | Buscar |
| Search users... | Buscar usuarios... |
| Name | Nombre |
| Email | Correo electrónico |
| Role | Rol |
| Joined | Unido |
| Actions | Acciones |
| Change Role | Cambiar de rol |
| User Role | Rol de usuario |
| Current Role | Rol actual |
| New Role | Nuevo rol |

---

# 22. User Roles

| English | Spanish |
|---|---|
| User | Usuario |
| Manager | Gerente |
| Administrator | Administración |
| Admin | Administrador |

> Preserve the project's existing distinction between `Admin`, `Administrator`, and role labels where applicable.

---

# 23. Change User Role Modal

| English | Spanish |
|---|---|
| Change User Role | Cambiar rol de usuario |
| Update the role for {user} | Actualiza el rol de {user} |
| Current Role | Rol actual |
| New Role | Nuevo rol |
| User | Usuario |
| Manager | Gerente |
| Administrator | Administración |
| Update | Actualizar |
| Cancel | Cancelar |

> `{user}` is dynamic and must remain unchanged.

---

# 24. Logout Confirmation

| English | Spanish |
|---|---|
| Confirm Logout | Confirmar cierre de sesión |
| Are you sure you want to logout? You will need to login again to access your dashboard and bookings. | ¿Seguro que quieres cerrar sesión? Tendrás que volver a iniciar sesión para acceder a tu panel y a tus reservas. |
| Cancel | Cancelar |
| Logout | Cerrar sesión |
| Confirm Session Logout | Confirmar cierre de sesión |
| Close Session | Cerrar sesión |

---

# 25. Empty States

| English | Spanish |
|---|---|
| No upcoming bookings | No hay reservas próximas |
| No upcoming bookings. | No hay reservas próximas. |
| No active bookings found. | No se encontraron reservas activas. |
| No previous bookings found | No se encontraron reservas anteriores |
| No previous bookings found. | No se encontraron reservas anteriores. |
| No users found | No se encontraron usuarios |
| No resources found | No se encontraron recursos |
| No valid bookings found | No se encontraron reservas válidas |
| No booking history found | No se encontraron registros de reservas |
| No bookings found | No se encontraron reservas |

---

# 26. Search / Filters / Controls

| English | Spanish |
|---|---|
| Search | Buscar |
| Search users... | Buscar usuarios... |
| Search by resource, purpose or user... | Buscar por recurso, propósito o usuario... |
| All Statuses | Todos los estados |
| All Users | Todos los usuarios |
| All Resources | Todos los recursos |
| Filter | Filtrar |
| Filters | Filtros |
| Clear | Limpiar |
| Select | Seleccionar |

---

# 27. Generic Buttons

| English | Spanish |
|---|---|
| Add | Agregar |
| Add New | Agregar nuevo |
| Create | Crear |
| Update | Actualizar |
| Delete | Borrar |
| Remove | Eliminar |
| Save | Guardar |
| Cancel | Cancelar |
| Close | Cerrar |
| Confirm | Confirmar |
| Next | Próximo |
| Previous | Anterior |
| Back | Atrás |
| View | Vista |
| View Details | Ver detalles |
| Export PDF | Exportar PDF |
| Send | Enviar |
| Search | Buscar |
| Done | Hecho |

---

# 28. AI Actions

| English | Spanish |
|---|---|
| AI Assistant | Asistente de IA |
| Generate Agenda with AI | Generar agenda con IA |
| Generate agenda | Generar agenda |
| Generate | Generar |
| AI Insights | Información sobre IA |
| AI Information | Información sobre IA |
| Chat with AI Assistant | Chatea con el asistente de IA |

---

# 29. Toast Notifications

> These translations are required even when no screenshot of the toast was provided. Keep them short, natural, and consistent with the visible Spanish UI.

| English | Spanish |
|---|---|
| Language changed to Spanish | Idioma cambiado a español |
| Booking created successfully | Reserva creada correctamente |
| Booking updated successfully | Reserva actualizada correctamente |
| Booking deleted successfully | Reserva eliminada correctamente |
| Booking cancelled successfully | Reserva cancelada correctamente |
| Booking approved successfully | Reserva aprobada correctamente |
| Booking rejected successfully | Reserva rechazada correctamente |
| Resource created successfully | Recurso creado correctamente |
| Resource updated successfully | Recurso actualizado correctamente |
| Resource deleted successfully | Recurso eliminado correctamente |
| User role updated successfully | Rol del usuario actualizado correctamente |
| PDF exported successfully | PDF exportado correctamente |
| Notification marked as read | Notificación marcada como leída |
| All notifications marked as read | Todas las notificaciones se marcaron como leídas |
| Logged out successfully | Sesión cerrada correctamente |
| Login successful | Inicio de sesión correcto |
| Failed to create booking | No se pudo crear la reserva |
| Failed to update booking | No se pudo actualizar la reserva |
| Failed to delete booking | No se pudo eliminar la reserva |
| Failed to approve booking | No se pudo aprobar la reserva |
| Failed to reject booking | No se pudo rechazar la reserva |
| Failed to create resource | No se pudo crear el recurso |
| Failed to update resource | No se pudo actualizar el recurso |
| Failed to delete resource | No se pudo eliminar el recurso |
| Failed to update user role | No se pudo actualizar el rol del usuario |
| Failed to export PDF | No se pudo exportar el PDF |
| Something went wrong | Algo salió mal |
| Please try again | Inténtalo de nuevo |
| Booking submitted successfully | Reserva enviada correctamente |
| Booking request submitted successfully | Solicitud de reserva enviada correctamente |
| No available time slot found | No se encontró ningún horario disponible |
| Please select a valid date | Selecciona una fecha válida |
| Please select a valid time | Selecciona una hora válida |
| Start time must be before end time | La hora de inicio debe ser anterior a la hora de finalización |
| End date must be after start date | La fecha de finalización debe ser posterior a la fecha de inicio |
| Resource is unavailable | El recurso no está disponible |
| Booking conflict detected | Se detectó un conflicto de reserva |
| AI agenda generated successfully | Agenda generada correctamente con IA |
| Failed to generate AI agenda | No se pudo generar la agenda con IA |
| Message sent successfully | Mensaje enviado correctamente |

---

# 30. Booking Conflict / Availability

| English | Spanish |
|---|---|
| Time Available | Horario disponible |
| Available | Disponible |
| Unavailable | No disponible |
| Booking Conflict | Conflicto de reserva |
| Conflict detected | Se detectó un conflicto |
| Resource is unavailable | El recurso no está disponible |
| Please choose another time | Elige otro horario |
| No available time slot found | No se encontró ningún horario disponible |

---

# 31. Pagination

| English | Spanish |
|---|---|
| Page | Página |
| of | de |
| Previous | Anterior |
| Next | Próximo |
| First | Primera |
| Last | Última |

---

# 32. General Confirmation Dialogs

| English | Spanish |
|---|---|
| Confirm | Confirmar |
| Are you sure? | ¿Estás seguro? |
| This action cannot be undone. | Esta acción no se puede deshacer. |
| Cancel | Cancelar |
| Continue | Continuar |
| Delete | Borrar |
| Remove | Eliminar |
| Close | Cerrar |

---

# 33. Dynamic Text Rules

The following values MUST NOT be translated:

```text
Room 10
Room 11
Room 12
Room 13
Room 14
Room 15
Admin
raj
deb
Nugget bitch
Debjit
Joy
Divyanshu Patil
Deborah Anyachukwu
NAMA... (user-generated names)
email@example.com
Meeting
Client Meeting
team meeting
sg
ttt
Ffg
asd
g
Aug 23, 2026
Aug 22, 2026
9:00 AM
10:00 AM
3:30 PM
5:30 PM
18
48
66
13
0
````

These are examples of dynamic values visible in the screenshots. Their actual runtime values must remain untouched.

---

# 34. Spanish Style Guidelines

Use the following style consistently throughout the application:

* Use neutral, professional Spanish.
* Use **"reserva"** for booking.
* Use **"recurso"** for room/resource.
* Use **"usuario"** for user.
* Use **"administrador"** for admin where the text refers to a person.
* Use **"panel"** for dashboard.
* Use **"calendario"** for calendar.
* Use **"gerente"** for manager.
* Use **"varios días"** for multi-day bookings.
* Use **"día único"** for single-day bookings.
* Use **"pendiente"**, **"aprobado"**, **"rechazado"**, **"cancelado"**, and **"terminado"** for booking states.
* Use **"Exportar PDF"** consistently.
* Use **"Nueva reserva"** consistently.
* Use **"Agregar recurso"** consistently.
* Use **"Cambiar de rol"** / **"Cambiar rol de usuario"** consistently depending on context.
* Use **"Cerrar sesión"** for logout.
* Use **"Marcar todo como leído"** for mark-all-as-read.
* Keep button labels concise.
* Keep modal descriptions natural and conversational rather than literal translations.
* Do not translate proper names, dynamic database values, email addresses, room names, IDs, or user-generated content.

---

# 35. Translation Activation Requirement

When the user switches the application language to Spanish:

```text
English → Spanish
```

the following must change immediately through the existing translation/i18n system:

```text
Navigation
Header
Dashboard
Bookings
Booking filters
Booking statuses
Calendar
Calendar controls
New Booking Step 1
New Booking Step 2
New Booking Step 3
Booking summary
PDF export modal
Resources
Resource modals
Users
Role-change modal
Logout confirmation
Notifications
Mark all as read
Empty states
AI assistant static UI
Toast notifications
Validation/error messages
Confirmation dialogs
Pagination
Generic buttons
```

Dynamic/database content must remain unchanged.

---

# 36. Final Translation Principle

Use this document as the authoritative Spanish UI dictionary for MeetOps.

Do not dynamically translate the interface with an AI model at runtime when a matching Spanish entry exists here.

Spanish should be loaded locally through the application's existing i18n/translation mechanism and should behave consistently with the other supported languages.

```
```
