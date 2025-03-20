DELIMITER $$

CREATE PROCEDURE delete_assignment (
    IN p_assignment_uuid CHAR(36), 
    IN p_user_id INT
)
BEGIN
    DECLARE assignment_category VARCHAR(16);

    START TRANSACTION;

    -- Step 1: Determine the assignment category (generated or manually created)
    SELECT category 
    INTO assignment_category
    FROM assignments
    WHERE uuid = p_assignment_uuid AND user_id = p_user_id;

    -- Step 2: Handle manually created assignments
    IF assignment_category != 'gen' THEN
        -- Unlink questions from the manually created assignment
        UPDATE questions
        SET assignment_uuid = NULL
        WHERE assignment_uuid = p_assignment_uuid;
    END IF;

    -- Step 3: Handle generated assignments
    IF assignment_category = 'gen' THEN
        -- Delete references in gen_assignments
        DELETE FROM gen_assignments
        WHERE assignment_uuid = p_assignment_uuid;
    END IF;

    -- Step 4: Delete the assignment itself
    DELETE FROM assignments
    WHERE uuid = p_assignment_uuid AND user_id = p_user_id;

    COMMIT;
END $$

DELIMITER ;
