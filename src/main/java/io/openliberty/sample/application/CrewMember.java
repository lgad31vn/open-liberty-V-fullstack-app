package io.openliberty.sample.application;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



@Data // from lombok, includes setters, getters, toString
@NoArgsConstructor // default constructor
@AllArgsConstructor // constructor with all args
public class CrewMember {
    @NotEmpty(message = "All crew members must have a name!")
	private String name; // make sure name is not null or empty

    @Pattern(regexp = "(Captain|Officer|Engineer)", message = "Crew member must be one of the listed ranks!")
	private String rank; // use Regular Expression to check the rank

    @Pattern(regexp = "^\\d+$", message = "ID Number must be a non-negative integer!")
	private String crewID; // use regex to make sure crewID is uint


}